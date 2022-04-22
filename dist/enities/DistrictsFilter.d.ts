import { IDistrictsFilter } from 'src/interfaces/IDistrictsFilter';
export declare const DISTRICTS_NAMES: {
    '0': string;
    '1': string;
    '2': string;
    '3': string;
};
export declare class DistrictsFilter {
    private _filter;
    switchFilter(roomsCount: keyof IDistrictsFilter): void;
    setFilterTemplate(filterTemplete: IDistrictsFilter): void;
    get filter(): IDistrictsFilter;
}
