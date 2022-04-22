"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentStateModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const apartmentState_controller_1 = require("../controllers/apartmentState.controller");
const apartmentState_schema_1 = require("../schemas/apartmentState.schema");
const apartmentState_service_1 = require("../services/apartmentState.service");
let ApartmentStateModule = class ApartmentStateModule {
};
ApartmentStateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: apartmentState_schema_1.ApartmentState.name, schema: apartmentState_schema_1.ApartmentStateSchema },
            ]),
        ],
        controllers: [apartmentState_controller_1.ApartmentStateController],
        providers: [apartmentState_service_1.ApartmentStateService],
    })
], ApartmentStateModule);
exports.ApartmentStateModule = ApartmentStateModule;
//# sourceMappingURL=apartmentState.module.js.map