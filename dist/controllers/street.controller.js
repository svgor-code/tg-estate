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
exports.StreetController = void 0;
const common_1 = require("@nestjs/common");
const CreateStreetDto_1 = require("../dto/street/CreateStreetDto");
const street_service_1 = require("../services/street.service");
const UpdateStreetDto_1 = require("../dto/street/UpdateStreetDto");
let StreetController = class StreetController {
    constructor(streetService) {
        this.streetService = streetService;
    }
    async get(id) {
        return this.streetService.get(id);
    }
    async create(createStreetDto) {
        try {
            const res = await this.streetService.create(createStreetDto);
            return res;
        }
        catch (error) {
            return error;
        }
    }
    async createMany(streets) {
        try {
            return await this.streetService.bulkCreate(streets);
        }
        catch (error) {
            return error;
        }
    }
    async findAll() {
        return this.streetService.findAll();
    }
    async update(id, updateStreetDto) {
        try {
            return await this.streetService.update(id, updateStreetDto);
        }
        catch (error) {
            return error;
        }
    }
    async delete(id) {
        return this.streetService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StreetController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStreetDto_1.CreateStreetDto]),
    __metadata("design:returntype", Promise)
], StreetController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StreetController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StreetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateStreetDto_1.UpdateStreetDto]),
    __metadata("design:returntype", Promise)
], StreetController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StreetController.prototype, "delete", null);
StreetController = __decorate([
    (0, common_1.Controller)('streets'),
    __metadata("design:paramtypes", [street_service_1.StreetService])
], StreetController);
exports.StreetController = StreetController;
//# sourceMappingURL=street.controller.js.map