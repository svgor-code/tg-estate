"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsFilter = void 0;
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