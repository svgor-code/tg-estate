import { ISellerTypesFilter } from 'src/interfaces/ISellerTypesFilter';

export const SELLER_TYPES = {
  '0': 'Собственник',
  '1': 'Все',
};

export class SellerTypeFilter {
  private _filter: ISellerTypesFilter = {
    '0': false,
    '1': false,
  };

  public get filter() {
    return this._filter;
  }

  public switchFilter(sellerIndex: keyof ISellerTypesFilter) {
    const oldValue = this._filter[sellerIndex];
    this._filter[sellerIndex] = !oldValue;

    Object.keys(this._filter)
      .filter((key) => key !== String(sellerIndex))
      .forEach((key) => {
        this._filter[key] = oldValue;
      });
  }

  public setFilterTemplate(filterTemplete?: ISellerTypesFilter | null) {
    if (!filterTemplete) {
      return;
    }

    this._filter = filterTemplete;
  }
}
