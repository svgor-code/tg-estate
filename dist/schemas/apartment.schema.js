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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentSchema = exports.Apartment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const moment_1 = __importDefault(require("moment"));
const mongoose_2 = __importDefault(require("mongoose"));
const apartment_interface_1 = require("../interfaces/apartment.interface");
const apartmentState_schema_1 = require("./apartmentState.schema");
const area_schema_1 = require("./area.schema");
let Apartment = class Apartment {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Apartment.prototype, "platformId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Apartment.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Apartment.prototype, "href", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, require: true }),
    __metadata("design:type", Number)
], Apartment.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, require: true }),
    __metadata("design:type", Number)
], Apartment.prototype, "pricePerMeter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Apartment.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Apartment.prototype, "street", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Apartment.prototype, "house", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Apartment.prototype, "rooms", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Apartment.prototype, "square", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Apartment.prototype, "floor", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Area',
        required: true,
        default: null,
    }),
    __metadata("design:type", area_schema_1.Area)
], Apartment.prototype, "area", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'ApartmentState' }),
    __metadata("design:type", apartmentState_schema_1.ApartmentState)
], Apartment.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: apartment_interface_1.ApartmentStatusEnum,
        required: true,
    }),
    __metadata("design:type", String)
], Apartment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Apartment.prototype, "checkCounter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Apartment.prototype, "checkedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true, default: (0, moment_1.default)().toDate() }),
    __metadata("design:type", Date)
], Apartment.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Apartment.prototype, "closedAt", void 0);
Apartment = __decorate([
    (0, mongoose_1.Schema)()
], Apartment);
exports.Apartment = Apartment;
exports.ApartmentSchema = mongoose_1.SchemaFactory.createForClass(Apartment);
//# sourceMappingURL=apartment.schema.js.map