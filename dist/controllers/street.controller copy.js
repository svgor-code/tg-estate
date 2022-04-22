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
exports.StreetController = void 0;
const common_1 = require("@nestjs/common");
const CreateStreetDto_1 = require("../dto/street/CreateStreetDto");
const street_service_1 = require("../services/street.service");
let StreetController = class StreetController {
    constructor(streetService) {
        this.streetService = streetService;
    }
    async create(createStreetDto) {
        return this.streetService.create(createStreetDto);
    }
    async findAll() {
        return this.streetService.findAll();
    }
};
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStreetDto_1.CreateStreetDto]),
    __metadata("design:returntype", Promise)
], StreetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StreetController.prototype, "findAll", null);
StreetController = __decorate([
    (0, common_1.Controller)('street'),
    __metadata("design:paramtypes", [street_service_1.StreetService])
], StreetController);
exports.StreetController = StreetController;
//# sourceMappingURL=street.controller%20copy.js.map