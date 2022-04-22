"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictsFilter = exports.DISTRICTS_NAMES = void 0;
exports.DISTRICTS_NAMES = {
    '0': 'Ленинский',
    '1': 'Засвияжский',
    '2': 'Железнодорожный',
    '3': 'Заволжский',
};
class DistrictsFilter {
    constructor() {
        this._filter = {
            '0': false,
            '1': false,
            '2': false,
            '3': false,
        };
    }
    switchFilter(roomsCount) {
        const oldValue = this._filter[roomsCount];
        this._filter[roomsCount] = !oldValue;
    }
    setFilterTemplate(filterTemplete) {
        this._filter = filterTemplete;
    }
    get filter() {
        return this._filter;
    }
}
exports.DistrictsFilter = DistrictsFilter;
//# sourceMappingURL=DistrictsFilter.js.map