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
exports.StreetService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const street_schema_1 = require("../schemas/street.schema");
let StreetService = class StreetService {
    constructor(streetModel) {
        this.streetModel = streetModel;
    }
    async get(id) {
        return this.streetModel.findById(id).exec();
    }
    async create(createStreetDto) {
        const createdStreet = await this.streetModel.create(createStreetDto);
        return createdStreet.save();
    }
    async bulkCreate(streets) {
        const createdStreets = await this.streetModel.insertMany(streets);
        return createdStreets;
    }
    async findAll() {
        const streets = await this.streetModel.find().exec();
        return streets.sort((a, b) => a.name.localeCompare(b.name));
    }
    async update(id, updateStreetDto) {
        const updatedStreet = await this.streetModel.findByIdAndUpdate(id, {
            $set: {
                name: updateStreetDto.name,
                avitoName: updateStreetDto.avitoName,
            },
        }, {
            new: true,
        });
        return updatedStreet;
    }
    async delete(id) {
        return await this.streetModel.deleteOne({
            _id: id,
        });
    }
};
StreetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(street_schema_1.Street.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], StreetService);
exports.StreetService = StreetService;
//# sourceMappingURL=street.service.js.map