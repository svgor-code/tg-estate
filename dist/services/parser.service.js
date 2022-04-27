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
var ParserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserService = void 0;
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const common_1 = require("@nestjs/common");
const apartment_service_1 = require("./apartment.service");
let ParserService = ParserService_1 = class ParserService {
    constructor(apartmentService) {
        this.apartmentService = apartmentService;
        this.logger = new common_1.Logger(ParserService_1.name);
    }
    async parseAvitoCatalog() {
        try {
            this.logger.log('avito catalog parser started');
            const response = await got_1.default.get('https://www.avito.ru/ulyanovsk/kvartiry/prodam/vtorichka-ASgBAQICAUSSA8YQAUDmBxSMUg?s=104', {
                http2: true,
                headers: {
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
                },
            });
            const $ = cheerio_1.default.load(response.body);
            const catalog = $('div[data-marker=catalog-serp]');
            const items = catalog.find('div[data-marker=item]').map((_, item) => {
                var _a;
                const elementTitle = $(item).find('a[data-marker=item-title]');
                const platformId = $(item).attr('data-item-id');
                const title = elementTitle.find('h3').text();
                const href = `https://www.avito.ru${elementTitle.attr('href')}`;
                const price = Number.parseFloat($(item)
                    .find('span[data-marker=item-price]')
                    .find('span')
                    .text()
                    .replace('₽₽', '')
                    .split('\xa0')
                    .join(''));
                const address = $(item).find('[class*=geo-address-]').text();
                const district = $(item).find('[class*=geo-georeferences-]').text() || '';
                const house = (_a = address.split(',')[1]) === null || _a === void 0 ? void 0 : _a.trim();
                const square = Number.parseFloat(title.split(', ')[1].split(' ')[0].split(',').join('.'));
                const roomsData = title.split(',')[0];
                const rooms = Number.parseInt(roomsData.includes('-к.') ? roomsData.split('-')[0] : roomsData);
                const floor = Number.parseInt(title.split(', ')[2].split('/')[0]);
                const pricePerMeter = Math.floor(price / square);
                return {
                    platformId,
                    title,
                    href,
                    price,
                    pricePerMeter,
                    house,
                    rooms: rooms || 1,
                    square,
                    floor,
                    address,
                    district,
                };
            });
            const apartments = Array.from(items) || [];
            await this.apartmentService.filterApartments(apartments);
            return {
                apartments,
                status: true,
            };
        }
        catch (error) {
            this.logger.error(error);
            return {
                apartments: [],
                status: false,
                error,
            };
        }
    }
};
ParserService = ParserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apartment_service_1.ApartmentService])
], ParserService);
exports.ParserService = ParserService;
//# sourceMappingURL=parser.service.js.map