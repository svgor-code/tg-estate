import fs from 'fs';
import path from 'path';
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
  MESSAGE_CURRENT_SQUARE_FILTER,
  MESSAGE_DISTRICTS_FILTER,
  MESSAGE_FLOOR_FILTER,
  MESSAGE_HEADER_ABOUT,
  MESSAGE_HEADER_FILTERS,
  MESSAGE_HEADER_FILTER_DISTRICTS,
  MESSAGE_HEADER_FILTER_FlOOR,
  MESSAGE_HEADER_FILTER_MAXPRICE,
  MESSAGE_HEADER_FILTER_ROOMS,
  MESSAGE_HEADER_FILTER_SQUARE,
  MESSAGE_HEADER_MAIN_MENU,
  MESSAGE_HEADER_SEARCH,
  MESSAGE_HEADER_SUPPORT,
  MESSAGE_MAXPRICE_FILTER,
  MESSAGE_ROOMS_FILTER,
  MESSAGE_SEARCH_OFF,
  MESSAGE_SEARCH_ON,
  MESSAGE_SQUARE_FILTER,
  MESSAGE_START,
  MESSAGE_START_2,
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

  private currentState: BotStatesEnum = BotStatesEnum.NULL;

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
      const chatId = msg.chat.id;
      const user = await this.userService.getUserByChatId(chatId);

      try {
        if (command !== '/start' && !user) {
          return await this.bot.sendMessage(
            chatId,
            'Введите команду /start для начала работы с ботом'
          );
        }

        if (command === '/start') {
          if (!user) {
            await this.userService.create({
              chatId,
            });
          }

          await this.bot.sendMessage(chatId, MESSAGE_START, {
            parse_mode: 'HTML',
          });

          await this.bot.sendMessage(chatId, MESSAGE_START_2, {
            parse_mode: 'HTML',
          });

          const instructionsVideo = fs.createReadStream(
            path.join(__dirname, '../../files/instructions.mp4')
          );

          await this.bot.sendVideo(chatId, instructionsVideo);
        }

        if (command === '/filters') {
          await this.sendFiltersMenu(user);
        }

        if (command === '/menu') {
          await this.sendMainMenu(user);
        }

        if (command === '/search') {
          await this.sendSearchMenu(user);
        }

        if (command === '/support') {
          await this.sendSupport(user);
        }

        if (this.currentState === BotStatesEnum.MAXPRICE) {
          const maxPrice = parseFloat(command);
          await this.saveMaxPriceFilter(user, maxPrice);
        }

        if (this.currentState === BotStatesEnum.FLOOR) {
          const [minFloorFilter, maxFloorFilter] = command
            .replace(/\s/g, '')
            .split('-');
          await this.saveFloorFilter(
            user,
            Number(minFloorFilter),
            Number(maxFloorFilter)
          );
        }

        if (this.currentState === BotStatesEnum.SQUARE) {
          const [minSquareFilter, maxSquareFilter] = command
            .replace(/\s/g, '')
            .split('-');
          await this.saveSquareFilter(
            user,
            Number(minSquareFilter),
            Number(maxSquareFilter)
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
      const chatId = msg.message.chat.id;
      const user = await this.userService.getUserByChatId(chatId);

      if (command !== '/start' && !user) {
        return await this.bot.sendMessage(
          chatId,
          'Введите команду /start для начала работы с ботом'
        );
      }

      const roomsFilter = new RoomsFilter();
      roomsFilter.setFilterTemplate(JSON.parse(user.roomsFilter || 'null'));

      const districtsFilter = new DistrictsFilter();
      districtsFilter.setFilterTemplate(
        JSON.parse(user.districtsFilter || 'null')
      );

      /* rooms filter */
      if (command === '/filter-rooms') {
        await this.sendRoomsFilter(user, roomsFilter);
      }

      if (/\/filter-rooms-[0-5]/.test(command)) {
        const roomsCount = command.match(/[0-5]/)[0];
        roomsFilter.switchFilter(roomsCount as unknown as keyof IRoomsFilter);

        const saveResult = await this.userService.updateRoomsFilter(
          user._id,
          roomsFilter.filter
        );

        if (saveResult) {
          await this.sendRoomsFilter(user, roomsFilter);
        }
      }

      if (command === '/filter-rooms-save') {
        const saveResult = await this.userService.updateRoomsFilter(
          user._id,
          roomsFilter.filter
        );

        if (saveResult) {
          await this.sendSuccessfullyUpdate(user);
        }
      }

      /* maxprice filter */
      if (command === '/filter-maxprice') {
        this.currentState = BotStatesEnum.MAXPRICE;
        await this.sendMaxPriceFilter(user);
      }

      /* square filter */
      if (command === '/filter-square') {
        this.currentState = BotStatesEnum.SQUARE;
        await this.sendSquareFilter(user);
      }

      /* floor filter */
      if (command === '/filter-floors') {
        this.currentState = BotStatesEnum.FLOOR;
        await this.sendFloorFilter(user);
      }

      /* districts filter */
      if (command === '/filter-districts') {
        await this.sendDistrictsFilter(user, districtsFilter);
      }

      if (/\/filter-districts-[0-3]/.test(command)) {
        const district = command.match(/[0-3]/)[0];

        districtsFilter.switchFilter(
          district as unknown as keyof IDistrictsFilter
        );

        const saveResult = await this.userService.updateDistrictsFilter(
          user._id,
          districtsFilter.filter
        );

        if (saveResult) {
          await this.sendDistrictsFilter(user, districtsFilter);
        }
      }

      if (command === '/filter-districts-save') {
        const saveResult = await this.userService.updateDistrictsFilter(
          user._id,
          districtsFilter.filter
        );

        if (saveResult) {
          await this.sendSuccessfullyUpdate(user);
        }
      }

      if (command === '/search-start') {
        const searchResult = await this.userService.switchSearch(
          user._id,
          true
        );

        if (searchResult) {
          await this.sendSearchUpdate(true, user);
        }
      }

      if (command === '/search-stop') {
        const searchResult = await this.userService.switchSearch(
          user._id,
          false
        );

        if (searchResult) {
          await this.sendSearchUpdate(false, user);
        }
      }

      if (command === '/menu') {
        await this.sendMainMenu(user);
      }

      if (command === '/about') {
        await this.sendAbout(user);
      }

      if (command === '/search') {
        await this.sendSearchMenu(user);
      }

      if (command === '/filters') {
        await this.sendFiltersMenu(user);
      }

      if (command === '/support') {
        await this.sendSupport(user);
      }
    });
  }

  async saveMaxPriceFilter(user: CreatedUser, maxPrice: number) {
    try {
      await this.userService.updateMaxPriceFilter(user._id, maxPrice);

      this.currentState = BotStatesEnum.NULL;
      return await this.sendSuccessfullyUpdate(user);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async saveFloorFilter(
    user: CreatedUser,
    minFloorFilter: number,
    maxFloorFilter: number
  ) {
    const saveResult = await this.userService.updateFloorFilter(
      user._id,
      minFloorFilter,
      maxFloorFilter
    );

    if (saveResult) {
      this.currentState = BotStatesEnum.NULL;
      return await this.sendSuccessfullyUpdate(user);
    }
  }

  async saveSquareFilter(
    user: CreatedUser,
    minSquareFilter: number,
    maxSquareFilter: number
  ) {
    const saveResult = await this.userService.updateSquareFilter(
      user._id,
      minSquareFilter,
      maxSquareFilter
    );

    if (saveResult) {
      this.currentState = BotStatesEnum.NULL;
      return await this.sendSuccessfullyUpdate(user);
    }
  }

  async sendApartment(user: CreatedUser, apartment: IApartment) {
    try {
      await this.bot.sendMessage(
        user.chatId,
        TEMPLATE_APARTMENT_MESSAGE(apartment),
        {
          parse_mode: 'HTML',
        }
      );

      await this.userService.addNewSendedApartment(user.chatId, apartment);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async sendMainMenu(user: CreatedUser) {
    return await this.bot.sendPhoto(
      user.chatId,
      'https://caballero.ai/wp-content/uploads/2021/03/0c675a8e1061478d2b7b21b330093444.gif',
      {
        caption: MESSAGE_HEADER_MAIN_MENU,
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_MAIN_MENU,
      }
    );
  }

  async sendSearchMenu(user: CreatedUser) {
    return await this.bot.sendMessage(
      user.chatId,
      TEMPLATE_SEARCH_VALUE(MESSAGE_HEADER_SEARCH, user.isSearchActive),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_SEARCH_MENU,
      }
    );
  }

  async sendSupport(user: CreatedUser) {
    return await this.bot.sendMessage(
      user.chatId,
      TEMPLATE_INFO_MESSAGE(MESSAGE_HEADER_SUPPORT, MESSAGE_BODY_SUPPORT),
      {
        parse_mode: 'HTML',
      }
    );
  }

  async sendAbout(user: CreatedUser) {
    return this.bot.sendMessage(
      user.chatId,
      TEMPLATE_INFO_MESSAGE(MESSAGE_HEADER_ABOUT, MESSAGE_BODY_ABOUT),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_BACK_TO_MENU,
      }
    );
  }

  async sendFiltersMenu(user: CreatedUser) {
    const roomsFilter = new RoomsFilter();
    roomsFilter.setFilterTemplate(JSON.parse(user.roomsFilter || 'null'));

    const districtsFilter = new DistrictsFilter();
    districtsFilter.setFilterTemplate(
      JSON.parse(user.districtsFilter || 'null')
    );

    const currentFilters: AllFiltersValues = {
      rooms: this.getCurrentRoomsFilter(roomsFilter),
      district: this.getCurrentDistrictsFilter(districtsFilter),
      floor: this.getCurrentFloorFilter(user),
      maxprice: this.getCurrentMaxPriceFilter(user),
      square: this.getCurrentSquareFilter(user),
    };

    return await this.bot.sendMessage(
      user.chatId,
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

  async sendSuccessfullyUpdate(user: CreatedUser) {
    return await this.bot.sendMessage(
      user.chatId,
      MESSAGE_SUCCESSFULLY_UPDATE(user.isSearchActive),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_BACK_TO_FILTER,
      }
    );
  }

  async sendSearchUpdate(isSearchActive: boolean, user: CreatedUser) {
    return await this.bot.sendMessage(
      user.chatId,
      isSearchActive ? MESSAGE_SEARCH_ON : MESSAGE_SEARCH_OFF,
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_BACK_TO_MENU,
      }
    );
  }

  async sendRoomsFilter(user: CreatedUser, roomsFilter: RoomsFilter) {
    const currentRoomsFilterMessage = this.getCurrentRoomsFilter(roomsFilter);

    return await this.bot.sendMessage(
      user.chatId,
      TEMPLATE_FILTER_VALUE(
        MESSAGE_HEADER_FILTER_ROOMS,
        currentRoomsFilterMessage,
        MESSAGE_ROOMS_FILTER
      ),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_ROOMS_FILTER(roomsFilter.filter),
      }
    );
  }

  async sendDistrictsFilter(
    user: CreatedUser,
    districtsFilter: DistrictsFilter
  ) {
    const currentDistrictsFilterMessage =
      this.getCurrentDistrictsFilter(districtsFilter);

    return await this.bot.sendMessage(
      user.chatId,
      TEMPLATE_FILTER_VALUE(
        MESSAGE_HEADER_FILTER_DISTRICTS,
        currentDistrictsFilterMessage,
        MESSAGE_DISTRICTS_FILTER
      ),
      {
        parse_mode: 'HTML',
        reply_markup: KEYBOARD_DISTRICTS_FILTER(districtsFilter.filter),
      }
    );
  }

  async sendMaxPriceFilter(user: CreatedUser) {
    const currentMaxPriceFilterMessage = this.getCurrentMaxPriceFilter(user);

    return await this.bot.sendMessage(
      user.chatId,
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

  async sendFloorFilter(user: CreatedUser) {
    const currentFloorFilterMessage = this.getCurrentFloorFilter(user);

    return await this.bot.sendMessage(
      user.chatId,
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

  async sendSquareFilter(user: CreatedUser) {
    const currentSquareFilterMessage = this.getCurrentSquareFilter(user);

    return await this.bot.sendMessage(
      user.chatId,
      TEMPLATE_FILTER_VALUE(
        MESSAGE_HEADER_FILTER_SQUARE,
        currentSquareFilterMessage,
        MESSAGE_SQUARE_FILTER
      ),
      {
        parse_mode: 'HTML',
      }
    );
  }

  private getCurrentFloorFilter(user: CreatedUser) {
    const { minFloorFilter, maxFloorFilter } = user;

    if (!minFloorFilter || !maxFloorFilter) {
      return null;
    }

    return MESSAGE_CURRENT_FLOOR_FILTER(minFloorFilter, maxFloorFilter);
  }

  private getCurrentSquareFilter(user: CreatedUser) {
    const { minSquareFilter, maxSquareFilter } = user;

    if (!minSquareFilter || !maxSquareFilter) {
      return null;
    }

    return MESSAGE_CURRENT_SQUARE_FILTER(minSquareFilter, maxSquareFilter);
  }

  private getCurrentMaxPriceFilter(user: CreatedUser) {
    const { maxPriceFilter } = user;

    if (!maxPriceFilter) {
      return null;
    }

    return MESSAGE_CURRENT_MAXPRICE_FILTER(maxPriceFilter);
  }

  private getCurrentRoomsFilter(roomsFilter: RoomsFilter) {
    const activeRooms = Object.keys(roomsFilter.filter).filter(
      (room) => roomsFilter.filter[room]
    );

    return MESSAGE_CURRENT_ROOMS_FILTER(activeRooms);
  }

  private getCurrentDistrictsFilter(districtFilter: DistrictsFilter) {
    const activeDistricts = Object.keys(districtFilter.filter).filter(
      (room) => districtFilter.filter[room]
    );

    return MESSAGE_CURRENT_DISTRICTS_FILTER(activeDistricts);
  }
}
