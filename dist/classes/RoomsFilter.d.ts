import { IRoomsFilter } from 'src/interfaces/IRoomsFilter';
export declare class RoomsFilter {
    private _filter;
    switchFilter(roomsCount: keyof IRoomsFilter): void;
    setFilterTemplate(filterTemplete: IRoomsFilter): void;
    get filter(): IRoomsFilter;
}
