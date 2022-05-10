export class CreateSubscriptionDto {
  name: string;
  price: number;
  days: number;
  isDisposable: boolean;
  isInitial: boolean;
}