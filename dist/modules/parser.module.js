"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserModule = void 0;
const common_1 = require("@nestjs/common");
const parser_controller_1 = require("../controllers/parser.controller");
const parser_service_1 = require("../services/parser.service");
let ParserModule = class ParserModule {
};
ParserModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [parser_service_1.ParserService],
        controllers: [parser_controller_1.ParserController],
        exports: [parser_service_1.ParserService],
    })
], ParserModule);
exports.ParserModule = ParserModule;
//# sourceMappingURL=parser.module.js.map