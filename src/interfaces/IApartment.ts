export interface IApartment {
  platformId: string;
  title: string;
  href: string;
  price: number;
  pricePerMeter: number;
  address: string;
  rooms?: number;
  square: number;
  floor?: number;
  district: string;
}