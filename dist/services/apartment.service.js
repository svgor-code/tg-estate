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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentService = void 0;
const common_1 = require("@nestjs/common");
const telegram_service_1 = require("./telegram.service");
const user_service_1 = require("./user.service");
let ApartmentService = class ApartmentService {
    constructor(userService, telegramService) {
        this.userService = userService;
        this.telegramService = telegramService;
        this.logger = new common_1.Logger();
    }
    async filterApartments(apartments) {
        try {
            const users = await this.userService.findAll({
                isSearchActive: true,
            });
            apartments.forEach(async (apartment) => {
                const { price, platformId, floor, rooms, district } = apartment;
                users.forEach(async (user) => {
                    const { chatId, minFloorFilter, maxFloorFilter, maxPriceFilter, districtsFilter, roomsFilter, sendedApartments, } = user;
                    if (floor >= minFloorFilter &&
                        floor <= maxFloorFilter &&
                        price <= maxPriceFilter &&
                        this.filterByRooms(roomsFilter, rooms) &&
                        this.filterByDistrict(districtsFilter, district) &&
                        !sendedApartments.includes(platformId)) {
                        await this.telegramService.sendApartment(chatId, apartment);
                    }
                });
            });
        }
        catch (error) {
            this.logger.error(error);
            return { success: false, error };
        }
    }
    filterByRooms(roomsFilterJSON, rooms) {
        if (!rooms && rooms !== 0)
            return false;
        const roomsFilter = JSON.parse(roomsFilterJSON || 'null');
        if (!roomsFilter)
            return true;
        const filterKey = rooms > 5 ? '5' : this.getKeyByValue(roomsFilter, rooms || 'студия');
        if (roomsFilter[filterKey]) {
            return true;
        }
        return false;
    }
    filterByDistrict(districtsFilterJSON, district) {
        if (!district)
            return false;
        const districtsFilter = JSON.parse(districtsFilterJSON || 'null');
        if (!districtsFilter)
            return true;
        const filterKey = this.getKeyByValue(districtsFilter, district);
        if (districtsFilter[filterKey]) {
            return true;
        }
        return false;
    }
    getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    }
};
ApartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        telegram_service_1.TelegramService])
], ApartmentService);
exports.ApartmentService = ApartmentService;
//# sourceMappingURL=apartment.service.js.map