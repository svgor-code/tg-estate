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
exports.AreaService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const area_schema_1 = require("../schemas/area.schema");
const streetHouse_schema_1 = require("../schemas/streetHouse.schema");
const apartment_service_1 = require("./apartment.service");
let AreaService = class AreaService {
    constructor(areaModel, streetHouseModel, apartmentService) {
        this.areaModel = areaModel;
        this.streetHouseModel = streetHouseModel;
        this.apartmentService = apartmentService;
    }
    async create(createAreaDto) {
        const { streetHouses } = createAreaDto;
        const savedStreetHouses = await this.createStreetHouses(streetHouses);
        const createdArea = new this.areaModel(Object.assign(Object.assign({}, createAreaDto), { streetHouses: savedStreetHouses }));
        return createdArea.save();
    }
    async findAll() {
        return this.areaModel
            .find()
            .populate({ path: 'streetHouses', populate: { path: 'street' } })
            .exec();
    }
    async get(id) {
        return this.areaModel
            .findById(id)
            .populate({ path: 'streetHouses', populate: { path: 'street' } })
            .exec();
    }
    async update(id, updateAreaDto) {
        await this.removeStreetHouses(id);
        const streetHouses = await this.createStreetHouses(updateAreaDto.streetHouses);
        const updatedArea = await this.areaModel.findByIdAndUpdate(id, {
            $set: {
                name: updateAreaDto.name,
                description: updateAreaDto.description,
                streetHouses,
            },
        }, {
            new: true,
        });
        return updatedArea;
    }
    async delete(id) {
        await this.removeStreetHouses(id);
        const linkedApartments = await this.apartmentService.findAll({
            area: id,
        });
        await Promise.all(linkedApartments.map(async (apartment) => {
            await this.apartmentService.updateArea(apartment._id, null);
        }));
        return await this.areaModel.deleteOne({
            _id: id,
        });
    }
    async createStreetHouses(streetHouses) {
        const createdStreetHouses = await Promise.all(streetHouses.map(async (streetHouse) => {
            return await new this.streetHouseModel(streetHouse);
        }));
        const savedStreetHouses = await Promise.all(createdStreetHouses.map(async (createdStreetHouse) => {
            return createdStreetHouse.save();
        }));
        return savedStreetHouses.map((item) => item._id) || [];
    }
    async removeStreetHouses(areaId) {
        var _a;
        const currentArea = await this.areaModel
            .findById(areaId)
            .populate('streetHouses');
        const currentStreetHousesIds = ((_a = currentArea.streetHouses) === null || _a === void 0 ? void 0 : _a.map((item) => item._id)) ||
            [];
        await this.streetHouseModel.deleteMany({
            _id: {
                $in: currentStreetHousesIds,
            },
        });
    }
};
AreaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(area_schema_1.Area.name)),
    __param(1, (0, mongoose_2.InjectModel)(streetHouse_schema_1.StreetHouse.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        apartment_service_1.ApartmentService])
], AreaService);
exports.AreaService = AreaService;
//# sourceMappingURL=area.service.js.map