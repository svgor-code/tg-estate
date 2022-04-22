import { Injectable, Logger } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { UserService } from './user.service';
import { RoomsFilter } from 'src/enities/RoomsFilter';
import { IRoomsFilter } from 'src/interfaces/IRoomsFilter';
import {
  AllFiltersValues,
  MESSAGE_BODY_ABOUT,
  MESSAGE_BODY_SUPPORT,
  MESSAGE_CURRENT_DISTRICTS_FILTER,
  MESSAGE_CURRENT_FILTERS,
  MESSAGE_CURRENT_FLOOR_FILTER,
  MESSAGE_CURRENT_MAXPRICE_FILTER,
  MESSAGE_CURRENT_ROOMS_FILTER,
  MESSAGE_DISTRICTS_FILTER,
  MESSAGE_FLOOR_FILTER,
  MESSAGE_HEADER_ABOUT,
  MESSAGE_HEADER_FILTERS,
  MESSAGE_HEADER_FILTER_DISTRICTS,
  MESSAGE_HEADER_FILTER_FlOOR,
  MESSAGE_HEADER_FILTER_MAXPRICE,
  MESSAGE_HEADER_FILTER_ROOMS,
  MESSAGE_HEADER_MAIN_MENU,
  MESSAGE_HEADER_SEARCH,
  MESSAGE_MAXPRICE_FILTER,
  MESSAGE_ROOMS_FILTER,
  MESSAGE_SEARCH_OFF,
  MESSAGE_SEARCH_ON,
  MESSAGE_START,
  MESSAGE_SUCCESSFULLY_UPDATE,
  MESSAGE_TG_MENU_FILTERS,
  MESSAGE_TG_MENU_MENU,
  MESSAGE_TG_MENU_SUPPORT,
  TEMPLATE_ALL_FILTERS_VALUE,
  TEMPLATE_APARTMENT_MESSAGE,
  TEMPLATE_FILTER_VALUE,
  TEMPLATE_INFO_MESSAGE,
  TEMPLATE_SEARCH_VALUE,
} from 'src/settings/messages';
import {
  KEYBOARD_BACK_TO_FILTER,
  KEYBOARD_BACK_TO_MENU,
  KEYBOARD_DISTRICTS_FILTER,
  KEYBOARD_FILTERS_START,
  KEYBOARD_MAIN_MENU,
  KEYBOARD_ROOMS_FILTER,
  KEYBOARD_SEARCH_MENU,
} from 'src/settings/keyboards';
import { CreatedUser } from 'src/interfaces/User';
import { BotStatesEnum } from 'src/interfaces/BotStatesEnum';
import { DistrictsFilter } from 'src/enities/DistrictsFilter';
import { IDistrictsFilter } from 'src/interfaces/IDistrictsFilter';
import { IApartment } from 'src/interfaces/IApartment';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot = new TelegramBot(process.env.TG_TOKEN, {
    polling: true,
  });

  private chatId = 0;
  private currentState: BotStatesEnum = BotStatesEnum.NULL;
  private user: CreatedUser | null = null;

  private roomsFilter = new RoomsFilter();
  private districtsFilter = new DistrictsFilter();

  constructor(private userService: UserService) {
    this.bot.setMyCommands([
      {
        command: '/menu',
        description: MESSAGE_TG_MENU_MENU,
      },
      {
        command: '/filters',
        description: MESSAGE_TG_MENU_FILTERS,
      },
      {
        command: '/support',
        description: MESSAGE_TG_MENU_SUPPORT,
      },
    ]);

    this.startListenCommands();
    this.startListenCallbacks();
  }

  async startListenCommands() {
    await this.bot.on('message', async (msg) => {
      const command = msg.text;
      this.chatId = msg.chat.id;
      this.user = await this.userService.getUserByChatId(this.chatId);

      try {
        if (command === '/start') {
          if (!this.user) {
            await this.userService.create({
              chatId: this.chatId,
            });

            this.user = await this.userService.getUserByChatId(this.chatId);
          }

          await this.bot.sendMessage(this.chatId, MESSAGE_START, {
            parse_mode: 'HTML',
          });
        }

        if (command === '/filters') {
          if (this.user) {
            await this.sendFiltersMenu();
          } else {
            await this.bot.sendMessage(
              this.chatId,
              'Введите команду /start для начала работы с ботом'
            );
          }
        }

        if (command === '/menu') {
          await this.sendMainMenu();
        }

        if (command === '/search') {
          await this.sendSearchMenu();
        }

        if (command === '/support') {
          await this.sendSupport();
        }

        if (this.currentState === BotStatesEnum.MAXPRICE) {
          const maxPrice = parseFloat(command) * 1000000;
          await this.saveMaxPriceFilter(maxPrice);
        }

        if (this.currentState === BotStatesEnum.FLOOR) {
          const [minFloorFilter, maxFloorFilter] = command
            .replace(/\s/g, '')
            .split('-');
          await this.saveFloorFilter(
            Number(minFloorFilter),
            Number(maxFloorFilter)
          );
        }
      } catch (error) {
        this.logger.error(error);
      }
    });
  }

  async startListenCallbacks() {
    await this.bot.on('callback_query', async (msg) => {
      const command = msg.data;
      this.chatId = msg.message.chat.id;
      this.user = await this.userService.getUserByChatId(this.chatId);

      /* rooms filter */
      if (command === '/filter-rooms') {
        const currentRoomsFilter =
          JSON.parse(this.user.roomsFilter || 'null') ||
          this.roomsFilter.filter;
        this.roomsFilter.setFilterTemplate(currentRoomsFilter);

        await this.sendRoomsFilter();
      }

      if (/\/filter-rooms-[0-5]/.test(command)) {
        const roomsCount = command.match(/[0-5]/)[0];
        this.roomsFilter.switchFilter(
          roomsCount as unknown as keyof IRoomsFilter
        );

        await this.sendRoomsFilter();
      }

      if (command === '/filter-rooms-save') {
        const saveResult = await this.userService.updateRoomsFilter(
          this.user._id,
          this.roomsFilter.filter
        );

        if (saveResult) {
          await this.sendSuccessfullyUpdate();
        }
      }

      /* maxprice filter */
      if (command === '/filter-maxprice') {
        this.currentState = BotStatesEnum.MAXPRICE;
        await this.sendMaxPriceFilter();
      }

      /* floor filter */
      if (command === '/filter-floors') {
        this.currentState = BotStatesEnum.FLOOR;
        await this.sendFloorFilter();
      }

      /* districts filter */
      if (command === '/filter-districts') {
        const currentDistrictsFilter =
          JSON.parse(this.user.districtsFilter || 'null') ||
          this.districtsFilter.filter;
        this.districtsFilter.setFilterTemplate(currentDistrictsFilter);

        await this.sendDistrictsFilter();
      }

      if (/\/filter-districts-[0-3]/.test(command)) {
        const district = command.match(/[0-3]/)[0];
        this.districtsFilter.switchFilter(
          district as unknown as keyof IDistrictsFilter
        );

        await this.sendDistrictsFilter();
      }

      if (command === '/filter-districts-save') {
        const saveResult = await this.userService.updateDistrictsFilter(
          this.user._id,
          this.districtsFilter.filter
        );

        if (saveResult) {
          await this.sendSuccessfullyUpdate();
        }
      }

      if (command === '/search-start') {
        const searchResult = await this.userService.switchSearch(
          this.user._id,
          true
        );

        if (searchResult) {
          await this.sendSearchUpdate(true);
        }
      }

      if (command === '/search-stop') {
        const searchResult = await this.userService.switchSearch(
          this.user._id,
          false
        );

        if (searchResult) {
          await this.sendSearchUpdate(false);
        }
      }

      if (command === '/menu') {
        await this.sendMainMenu();
      }

      if (command === '/about') {
        await this.sendAbout();
      }

      if (command === '/search') {
        await this.sendSearchMenu();
      }

      if (command === '/filters') {
        await this.sendFiltersMenu();
      }

      if (command === '/support') {
        await this.sendSupport();
      }
    });
  }

  async saveMaxPriceFilter(maxPrice: number) {
    try {
      await this.userService.updateMaxPriceFilter(this.user._id, maxPrice);

      this.currentState = BotStatesEnum.NULL;
      return await this.sendSuccessfullyUpdate();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async saveFloorFilter(minFloorFilter: number, maxFloorFilter: number) {
    const saveResult = await this.userService.updateFloorFilter(
      this.user._id,
      minFloorFilter,
      maxFloorFilter
    );

    if (saveResult) {
      this.currentState = BotStatesEnum.NULL;
      return await this.sendSuccessfullyUpdate();
    }
  }

  async sendApartment(chatId: number, apartment: IApartment) {
    try {
      await this.bot.sendMessage(chatId, TEMPLATE_APARTMENT_MESSAGE(apartment), {
        parse_mode: 'HTML',
      });

      await this.userService.addNewSendedApartment(chatId, apartment);
    } catch(error) {
      this.logger.error(error);
    }
  }

  async sendMainMenu() {
    return await this.bot.sendMessage(this.chatId, MESSAGE_HEADER_MAIN_MENU, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARD_MAIN_MENU,
    });
  }

  async sendSearchMenu() {
    return await this.bot.sendMessage(
      this.chatId,
      TEMPLATE_SEARCH_VALUE(MESSAGE_HEADER_SEARCH, this.user.isSearchActive),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_SEARCH_MENU,
      }
    );
  }

  async sendSupport() {
    return await this.bot.sendMessage(
      this.chatId,
      TEMPLATE_INFO_MESSAGE(MESSAGE_HEADER_SEARCH, MESSAGE_BODY_SUPPORT)
    );
  }

  async sendAbout() {
    return this.bot.sendMessage(
      this.chatId,
      TEMPLATE_INFO_MESSAGE(MESSAGE_HEADER_ABOUT, MESSAGE_BODY_ABOUT),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_BACK_TO_MENU,
      }
    );
  }

  async sendFiltersMenu() {
    const currentFilters: AllFiltersValues = {
      district: this.getCurrentDistrictsFilter(),
      rooms: this.getCurrentRoomsFilter(),
      floor: this.getCurrentFloorFilter(),
      maxprice: this.getCurrentMaxPriceFilter(),
    };

    return await this.bot.sendMessage(
      this.chatId,
      TEMPLATE_ALL_FILTERS_VALUE(
        MESSAGE_HEADER_FILTERS,
        currentFilters,
        MESSAGE_CURRENT_FILTERS
      ),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_FILTERS_START,
      }
    );
  }

  async sendSuccessfullyUpdate() {
    return await this.bot.sendMessage(
      this.chatId,
      MESSAGE_SUCCESSFULLY_UPDATE,
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_BACK_TO_FILTER,
      }
    );
  }

  async sendSearchUpdate(isSearchActive: boolean) {
    return await this.bot.sendMessage(
      this.chatId,
      isSearchActive ? MESSAGE_SEARCH_ON : MESSAGE_SEARCH_OFF,
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_BACK_TO_MENU,
      }
    );
  }

  async sendRoomsFilter() {
    const currentRoomsFilterMessage = this.getCurrentRoomsFilter();

    return await this.bot.sendMessage(
      this.chatId,
      TEMPLATE_FILTER_VALUE(
        MESSAGE_HEADER_FILTER_ROOMS,
        currentRoomsFilterMessage,
        MESSAGE_ROOMS_FILTER
      ),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_ROOMS_FILTER(this.roomsFilter.filter),
      }
    );
  }

  async sendDistrictsFilter() {
    const currentDistrictsFilterMessage = this.getCurrentDistrictsFilter();

    return await this.bot.sendMessage(
      this.chatId,
      TEMPLATE_FILTER_VALUE(
        MESSAGE_HEADER_FILTER_DISTRICTS,
        currentDistrictsFilterMessage,
        MESSAGE_DISTRICTS_FILTER
      ),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_DISTRICTS_FILTER(this.districtsFilter.filter),
      }
    );
  }

  async sendMaxPriceFilter() {
    const currentMaxPriceFilterMessage = this.getCurrentMaxPriceFilter();

    return await this.bot.sendMessage(
      this.chatId,
      TEMPLATE_FILTER_VALUE(
        MESSAGE_HEADER_FILTER_MAXPRICE,
        currentMaxPriceFilterMessage,
        MESSAGE_MAXPRICE_FILTER
      ),
      {
        parse_mode: 'HTML',
      }
    );
  }

  async sendFloorFilter() {
    const currentFloorFilterMessage = this.getCurrentFloorFilter();

    return await this.bot.sendMessage(
      this.chatId,
      TEMPLATE_FILTER_VALUE(
        MESSAGE_HEADER_FILTER_FlOOR,
        currentFloorFilterMessage,
        MESSAGE_FLOOR_FILTER
      ),
      {
        parse_mode: 'HTML',
      }
    );
  }

  private getCurrentFloorFilter() {
    const { minFloorFilter, maxFloorFilter } = this.user;

    if (!minFloorFilter || !maxFloorFilter) {
      return null;
    }

    return MESSAGE_CURRENT_FLOOR_FILTER(minFloorFilter, maxFloorFilter);
  }

  private getCurrentMaxPriceFilter() {
    const { maxPriceFilter } = this.user;

    if (!maxPriceFilter) {
      return null;
    }

    return MESSAGE_CURRENT_MAXPRICE_FILTER(maxPriceFilter);
  }

  private getCurrentRoomsFilter() {
    const { roomsFilter } = this.user;

    if (!roomsFilter || !JSON.parse(roomsFilter)) {
      return null;
    }

    const parsedRoomsFilter = JSON.parse(roomsFilter);

    const activeRooms = Object.keys(parsedRoomsFilter).filter(
      (room) => parsedRoomsFilter[room]
    );

    return MESSAGE_CURRENT_ROOMS_FILTER(activeRooms);
  }

  private getCurrentDistrictsFilter() {
    const { districtsFilter } = this.user;

    if (!districtsFilter || !JSON.parse(districtsFilter)) {
      return null;
    }

    const parsedDistrictsFilter = JSON.parse(districtsFilter);

    const activeDistricts = Object.keys(parsedDistrictsFilter).filter(
      (room) => parsedDistrictsFilter[room]
    );

    return MESSAGE_CURRENT_DISTRICTS_FILTER(activeDistricts);
  }
}
