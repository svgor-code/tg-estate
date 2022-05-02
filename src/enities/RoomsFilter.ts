import { IRoomsFilter } from 'src/interfaces/IRoomsFilter';

export const ROOMS_NAMES = {
  '0': 'Студия',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5+',
};

export const ROOMS_VALUES = {
  '0': 'студия',
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
};

export class RoomsFilter {
  private _filter: IRoomsFilter = {
    '0': false,
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  };

  public switchFilter(roomsCount: keyof IRoomsFilter) {
    const oldValue = this._filter[roomsCount];
    this._filter[roomsCount] = !oldValue;
  }

  public setFilterTemplate(filterTemplete?: IRoomsFilter | null) {
    if (!filterTemplete) {
      return;
    }

    this._filter = filterTemplete;
  }

  public get filter() {
    return this._filter;
  }
}
