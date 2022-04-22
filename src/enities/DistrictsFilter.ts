import { IDistrictsFilter } from 'src/interfaces/IDistrictsFilter';

export const DISTRICTS_NAMES = {
  '0': 'Ленинский',
  '1': 'Засвияжский',
  '2': 'Железнодорожный',
  '3': 'Заволжский',
};

export class DistrictsFilter {
  private _filter: IDistrictsFilter = {
    '0': false,
    '1': false,
    '2': false,
    '3': false,
  };

  public switchFilter(roomsCount: keyof IDistrictsFilter) {
    const oldValue = this._filter[roomsCount];
    this._filter[roomsCount] = !oldValue;
  }

  public setFilterTemplate(filterTemplete: IDistrictsFilter) {
    this._filter = filterTemplete;
  }

  public get filter() {
    return this._filter;
  }
}
