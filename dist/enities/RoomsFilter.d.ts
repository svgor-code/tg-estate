import { IRoomsFilter } from 'src/interfaces/IRoomsFilter';
export declare const ROOMS_NAMES: {
    '0': string;
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
};
export declare const ROOMS_VALUES: {
    '0': string;
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
};
export declare class RoomsFilter {
    private _filter;
    switchFilter(roomsCount: keyof IRoomsFilter): void;
    setFilterTemplate(filterTemplete: IRoomsFilter): void;
    get filter(): IRoomsFilter;
}
