import { CreateStreetHouseDto } from '../streetHouse/CreateStreetHouseDto';
export declare class CreateAreaDto {
    name: string;
    description: string;
    streetHouses: CreateStreetHouseDto[];
}
