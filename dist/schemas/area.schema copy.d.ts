import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { StreetHouse } from './streetHouse.schema';
export declare type AreaDocument = Area & Document;
export declare class Area {
    name: string;
    pricePerMeter: number;
    streetHouses: StreetHouse[];
}
export declare const AreaSchema: mongoose.Schema<mongoose.Document<Area, any, any>, mongoose.Model<mongoose.Document<Area, any, any>, any, any, any>, any, any>;
