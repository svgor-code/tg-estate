"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const user_service_1 = require("./user.service");
const RoomsFilter_1 = require("../enities/RoomsFilter");
const messages_1 = require("../settings/messages");
const keyboards_1 = require("../settings/keyboards");
const BotStatesEnum_1 = require("../interfaces/BotStatesEnum");
const DistrictsFilter_1 = require("../enities/DistrictsFilter");
let TelegramService = TelegramService_1 = class TelegramService {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(TelegramService_1.name);
        this.bot = new node_telegram_bot_api_1.default(process.env.TG_TOKEN, {
            polling: true,
        });
        this.chatId = 0;
        this.currentState = BotStatesEnum_1.BotStatesEnum.NULL;
        this.user = null;
        this.roomsFilter = new RoomsFilter_1.RoomsFilter();
        this.districtsFilter = new DistrictsFilter_1.DistrictsFilter();
        this.bot.setMyCommands([
            {
                command: '/menu',
                description: messages_1.MESSAGE_TG_MENU_MENU,
            },
            {
                command: '/filters',
                description: messages_1.MESSAGE_TG_MENU_FILTERS,
            },
            {
                command: '/support',
                description: messages_1.MESSAGE_TG_MENU_SUPPORT,
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
                    await this.bot.sendMessage(this.chatId, messages_1.MESSAGE_START, {
                        parse_mode: 'HTML',
                    });
                }
                if (command === '/filters') {
                    if (this.user) {
                        await this.sendFiltersMenu();
                    }
                    else {
                        await this.bot.sendMessage(this.chatId, 'Введите команду /start для начала работы с ботом');
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
                if (this.currentState === BotStatesEnum_1.BotStatesEnum.MAXPRICE) {
                    const maxPrice = parseFloat(command) * 1000000;
                    await this.saveMaxPriceFilter(maxPrice);
                }
                if (this.currentState === BotStatesEnum_1.BotStatesEnum.FLOOR) {
                    const [minFloorFilter, maxFloorFilter] = command
                        .replace(/\s/g, '')
                        .split('-');
                    await this.saveFloorFilter(Number(minFloorFilter), Number(maxFloorFilter));
                }
            }
            catch (error) {
                this.logger.error(error);
            }
        });
    }
    async startListenCallbacks() {
        await this.bot.on('callback_query', async (msg) => {
            const command = msg.data;
            this.chatId = msg.message.chat.id;
            this.user = await this.userService.getUserByChatId(this.chatId);
            if (command === '/filter-rooms') {
                const currentRoomsFilter = JSON.parse(this.user.roomsFilter || 'null') ||
                    this.roomsFilter.filter;
                this.roomsFilter.setFilterTemplate(currentRoomsFilter);
                await this.sendRoomsFilter();
            }
            if (/\/filter-rooms-[0-5]/.test(command)) {
                const roomsCount = command.match(/[0-5]/)[0];
                this.roomsFilter.switchFilter(roomsCount);
                await this.sendRoomsFilter();
            }
            if (command === '/filter-rooms-save') {
                const saveResult = await this.userService.updateRoomsFilter(this.user._id, this.roomsFilter.filter);
                if (saveResult) {
                    await this.sendSuccessfullyUpdate();
                }
            }
            if (command === '/filter-maxprice') {
                this.currentState = BotStatesEnum_1.BotStatesEnum.MAXPRICE;
                await this.sendMaxPriceFilter();
            }
            if (command === '/filter-floors') {
                this.currentState = BotStatesEnum_1.BotStatesEnum.FLOOR;
                await this.sendFloorFilter();
            }
            if (command === '/filter-districts') {
                const currentDistrictsFilter = JSON.parse(this.user.districtsFilter || 'null') ||
                    this.districtsFilter.filter;
                this.districtsFilter.setFilterTemplate(currentDistrictsFilter);
                await this.sendDistrictsFilter();
            }
            if (/\/filter-districts-[0-3]/.test(command)) {
                const district = command.match(/[0-3]/)[0];
                this.districtsFilter.switchFilter(district);
                await this.sendDistrictsFilter();
            }
            if (command === '/filter-districts-save') {
                const saveResult = await this.userService.updateDistrictsFilter(this.user._id, this.districtsFilter.filter);
                if (saveResult) {
                    await this.sendSuccessfullyUpdate();
                }
            }
            if (command === '/search-start') {
                const searchResult = await this.userService.switchSearch(this.user._id, true);
                if (searchResult) {
                    await this.sendSearchUpdate(true);
                }
            }
            if (command === '/search-stop') {
                const searchResult = await this.userService.switchSearch(this.user._id, false);
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
    async saveMaxPriceFilter(maxPrice) {
        try {
            await this.userService.updateMaxPriceFilter(this.user._id, maxPrice);
            this.currentState = BotStatesEnum_1.BotStatesEnum.NULL;
            return await this.sendSuccessfullyUpdate();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async saveFloorFilter(minFloorFilter, maxFloorFilter) {
        const saveResult = await this.userService.updateFloorFilter(this.user._id, minFloorFilter, maxFloorFilter);
        if (saveResult) {
            this.currentState = BotStatesEnum_1.BotStatesEnum.NULL;
            return await this.sendSuccessfullyUpdate();
        }
    }
    async sendApartment(chatId, apartment) {
        try {
            await this.bot.sendMessage(chatId, (0, messages_1.TEMPLATE_APARTMENT_MESSAGE)(apartment), {
                parse_mode: 'HTML',
            });
            await this.userService.addNewSendedApartment(chatId, apartment);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async sendMainMenu() {
        return await this.bot.sendMessage(this.chatId, messages_1.MESSAGE_HEADER_MAIN_MENU, {
            parse_mode: 'HTML',
            reply_markup: keyboards_1.KEYBOARD_MAIN_MENU,
        });
    }
    async sendSearchMenu() {
        return await this.bot.sendMessage(this.chatId, (0, messages_1.TEMPLATE_SEARCH_VALUE)(messages_1.MESSAGE_HEADER_SEARCH, this.user.isSearchActive), {
            parse_mode: 'HTML',
            reply_markup: keyboards_1.KEYBOARD_SEARCH_MENU,
        });
    }
    async sendSupport() {
        return await this.bot.sendMessage(this.chatId, (0, messages_1.TEMPLATE_INFO_MESSAGE)(messages_1.MESSAGE_HEADER_SEARCH, messages_1.MESSAGE_BODY_SUPPORT));
    }
    async sendAbout() {
        return this.bot.sendMessage(this.chatId, (0, messages_1.TEMPLATE_INFO_MESSAGE)(messages_1.MESSAGE_HEADER_ABOUT, messages_1.MESSAGE_BODY_ABOUT), {
            parse_mode: 'HTML',
            reply_markup: keyboards_1.KEYBOARD_BACK_TO_MENU,
        });
    }
    async sendFiltersMenu() {
        const currentFilters = {
            district: this.getCurrentDistrictsFilter(),
            rooms: this.getCurrentRoomsFilter(),
            floor: this.getCurrentFloorFilter(),
            maxprice: this.getCurrentMaxPriceFilter(),
        };
        return await this.bot.sendMessage(this.chatId, (0, messages_1.TEMPLATE_ALL_FILTERS_VALUE)(messages_1.MESSAGE_HEADER_FILTERS, currentFilters, messages_1.MESSAGE_CURRENT_FILTERS), {
            parse_mode: 'HTML',
            reply_markup: keyboards_1.KEYBOARD_FILTERS_START,
        });
    }
    async sendSuccessfullyUpdate() {
        return await this.bot.sendMessage(this.chatId, messages_1.MESSAGE_SUCCESSFULLY_UPDATE, {
            parse_mode: 'HTML',
            reply_markup: keyboards_1.KEYBOARD_BACK_TO_FILTER,
        });
    }
    async sendSearchUpdate(isSearchActive) {
        return await this.bot.sendMessage(this.chatId, isSearchActive ? messages_1.MESSAGE_SEARCH_ON : messages_1.MESSAGE_SEARCH_OFF, {
            parse_mode: 'HTML',
            reply_markup: keyboards_1.KEYBOARD_BACK_TO_MENU,
        });
    }
    async sendRoomsFilter() {
        const currentRoomsFilterMessage = this.getCurrentRoomsFilter();
        return await this.bot.sendMessage(this.chatId, (0, messages_1.TEMPLATE_FILTER_VALUE)(messages_1.MESSAGE_HEADER_FILTER_ROOMS, currentRoomsFilterMessage, messages_1.MESSAGE_ROOMS_FILTER), {
            parse_mode: 'HTML',
            reply_markup: (0, keyboards_1.KEYBOARD_ROOMS_FILTER)(this.roomsFilter.filter),
        });
    }
    async sendDistrictsFilter() {
        const currentDistrictsFilterMessage = this.getCurrentDistrictsFilter();
        return await this.bot.sendMessage(this.chatId, (0, messages_1.TEMPLATE_FILTER_VALUE)(messages_1.MESSAGE_HEADER_FILTER_DISTRICTS, currentDistrictsFilterMessage, messages_1.MESSAGE_DISTRICTS_FILTER), {
            parse_mode: 'HTML',
            reply_markup: (0, keyboards_1.KEYBOARD_DISTRICTS_FILTER)(this.districtsFilter.filter),
        });
    }
    async sendMaxPriceFilter() {
        const currentMaxPriceFilterMessage = this.getCurrentMaxPriceFilter();
        return await this.bot.sendMessage(this.chatId, (0, messages_1.TEMPLATE_FILTER_VALUE)(messages_1.MESSAGE_HEADER_FILTER_MAXPRICE, currentMaxPriceFilterMessage, messages_1.MESSAGE_MAXPRICE_FILTER), {
            parse_mode: 'HTML',
        });
    }
    async sendFloorFilter() {
        const currentFloorFilterMessage = this.getCurrentFloorFilter();
        return await this.bot.sendMessage(this.chatId, (0, messages_1.TEMPLATE_FILTER_VALUE)(messages_1.MESSAGE_HEADER_FILTER_FlOOR, currentFloorFilterMessage, messages_1.MESSAGE_FLOOR_FILTER), {
            parse_mode: 'HTML',
        });
    }
    getCurrentFloorFilter() {
        if (!this.user) {
            return null;
        }
        const { minFloorFilter, maxFloorFilter } = this.user;
        if (!minFloorFilter || !maxFloorFilter) {
            return null;
        }
        return (0, messages_1.MESSAGE_CURRENT_FLOOR_FILTER)(minFloorFilter, maxFloorFilter);
    }
    getCurrentMaxPriceFilter() {
        if (!this.user) {
            return null;
        }
        const { maxPriceFilter } = this.user;
        if (!maxPriceFilter) {
            return null;
        }
        return (0, messages_1.MESSAGE_CURRENT_MAXPRICE_FILTER)(maxPriceFilter);
    }
    getCurrentRoomsFilter() {
        if (!this.user) {
            return null;
        }
        const { roomsFilter } = this.user;
        if (!roomsFilter || !JSON.parse(roomsFilter)) {
            return null;
        }
        const parsedRoomsFilter = JSON.parse(roomsFilter);
        const activeRooms = Object.keys(parsedRoomsFilter).filter((room) => parsedRoomsFilter[room]);
        return (0, messages_1.MESSAGE_CURRENT_ROOMS_FILTER)(activeRooms);
    }
    getCurrentDistrictsFilter() {
        if (!this.user) {
            return null;
        }
        const { districtsFilter } = this.user;
        if (!districtsFilter || !JSON.parse(districtsFilter)) {
            return null;
        }
        const parsedDistrictsFilter = JSON.parse(districtsFilter);
        const activeDistricts = Object.keys(parsedDistrictsFilter).filter((room) => parsedDistrictsFilter[room]);
        return (0, messages_1.MESSAGE_CURRENT_DISTRICTS_FILTER)(activeDistricts);
    }
};
TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], TelegramService);
exports.TelegramService = TelegramService;
//# sourceMappingURL=telegram.service.js.map