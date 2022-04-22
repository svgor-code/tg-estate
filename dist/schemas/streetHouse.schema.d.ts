import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Street } from './street.schema';
export declare type StreetHouseDocument = StreetHouse & Document;
export declare class StreetHouse {
    houses: string[];
    street: Street;
}
export declare const StreetHouseSchema: mongoose.Schema<mongoose.Document<StreetHouse, any, any>, mongoose.Model<mongoose.Document<StreetHouse, any, any>, any, any, any>, {}, {}>;
