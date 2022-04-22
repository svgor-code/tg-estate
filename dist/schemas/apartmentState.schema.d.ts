/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type ApartmentStateDocument = ApartmentState & Document;
export declare class ApartmentState {
    name: string;
    order: number;
}
export declare const ApartmentStateSchema: import("mongoose").Schema<Document<ApartmentState, any, any>, import("mongoose").Model<Document<ApartmentState, any, any>, any, any, any>, {}, {}>;
