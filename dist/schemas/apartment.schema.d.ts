import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ApartmentStatusEnum } from 'src/interfaces/apartment.interface';
import { ApartmentState } from './apartmentState.schema';
import { Area } from './area.schema';
export declare type ApartmentDocument = Apartment & Document;
export declare class Apartment {
    platformId: string;
    title: string;
    href: string;
    price: number;
    pricePerMeter: number;
    address: string;
    street: string;
    house: string;
    rooms: number;
    square: number;
    floor: number;
    area: Area;
    state: ApartmentState;
    status: ApartmentStatusEnum;
    checkCounter: number;
    checkedAt: Date;
    createdAt: Date;
    closedAt: Date;
}
export declare const ApartmentSchema: mongoose.Schema<mongoose.Document<Apartment, any, any>, mongoose.Model<mongoose.Document<Apartment, any, any>, any, any, any>, {}, {}>;
