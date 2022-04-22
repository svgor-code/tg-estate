/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type StreetDocument = Street & Document;
export declare class Street {
    name: string;
    avitoName: string;
}
export declare const StreetSchema: import("mongoose").Schema<Document<Street, any, any>, import("mongoose").Model<Document<Street, any, any>, any, any, any>, {}, {}>;
