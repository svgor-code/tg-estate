"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsFilter = exports.ROOMS_VALUES = exports.ROOMS_NAMES = void 0;
exports.ROOMS_NAMES = {
    '0': 'Студия',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5+',
};
exports.ROOMS_VALUES = {
    '0': 'студия',
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
};
class RoomsFilter {
    constructor() {
        this._filter = {
            '0': false,
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
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
exports.RoomsFilter = RoomsFilter;
//# sourceMappingURL=RoomsFilter.js.map