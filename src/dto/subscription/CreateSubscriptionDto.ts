export class CreateSubscriptionDto {
  name: string;
  price: number;
  priceString: string;
  days: number;
  isDisposable: boolean;
  isInitial: boolean;
}