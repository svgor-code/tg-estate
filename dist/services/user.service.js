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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const createdStreet = await this.userModel.create(createUserDto);
        return createdStreet.save();
    }
    async findAll(filter) {
        const users = await this.userModel.find({ filter }).exec();
        return users;
    }
    async getUserByChatId(chatId) {
        const user = await this.userModel
            .findOne({
            chatId,
        })
            .exec();
        return user;
    }
    async addNewSendedApartment(chatId, apartment) {
        const { platformId } = apartment;
        const { _id, sendedApartments } = await this.getUserByChatId(chatId);
        const newSendedApartments = [...(sendedApartments || []), platformId];
        const updatedUser = await this.userModel.findByIdAndUpdate(_id, {
            $set: {
                sendedApartments: newSendedApartments,
            },
        }, {
            new: true,
        });
        return updatedUser;
    }
    async switchSearch(userId, isSearchActive) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                isSearchActive,
            },
        }, {
            new: true,
        });
        return updatedUser;
    }
    async updateRoomsFilter(userId, roomsFilter) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                roomsFilter: JSON.stringify(roomsFilter),
            },
        }, {
            new: true,
        });
        return updatedUser;
    }
    async updateDistrictsFilter(userId, districtsFilter) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                districtsFilter: JSON.stringify(districtsFilter),
            },
        }, {
            new: true,
        });
        return updatedUser;
    }
    async updateMaxPriceFilter(userId, maxPrice) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                maxPriceFilter: maxPrice,
            },
        }, {
            new: true,
        });
        return updatedUser;
    }
    async updateFloorFilter(userId, minFloorFilter, maxFloorFilter) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                minFloorFilter,
                maxFloorFilter,
            },
        }, {
            new: true,
        });
        return updatedUser;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map