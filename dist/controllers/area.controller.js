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
exports.AreaController = void 0;
const common_1 = require("@nestjs/common");
const CreateAreaDto_1 = require("../dto/area/CreateAreaDto");
const UpdateAreaDto_1 = require("../dto/area/UpdateAreaDto");
const area_service_1 = require("../services/area.service");
const apartment_service_1 = require("../services/apartment.service");
let AreaController = class AreaController {
    constructor(areaService, apartmentService) {
        this.areaService = areaService;
        this.apartmentService = apartmentService;
    }
    async create(createAreaDto) {
        const newArea = await this.areaService.create(createAreaDto);
        await this.apartmentService.addNewAreaToApartments(newArea._id.toString());
        return newArea;
    }
    async update(id, updateAreaDto) {
        return this.areaService.update(id, updateAreaDto);
    }
    async findAll() {
        return this.areaService.findAll();
    }
    async get(id) {
        return this.areaService.get(id);
    }
    async delete(id) {
        return this.areaService.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAreaDto_1.CreateAreaDto]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateAreaDto_1.UpdateAreaDto]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "get", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "delete", null);
AreaController = __decorate([
    (0, common_1.Controller)('areas'),
    __metadata("design:paramtypes", [area_service_1.AreaService,
        apartment_service_1.ApartmentService])
], AreaController);
exports.AreaController = AreaController;
//# sourceMappingURL=area.controller.js.map