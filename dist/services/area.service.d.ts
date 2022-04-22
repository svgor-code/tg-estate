import { Model, Document } from 'mongoose';
import { Area, AreaDocument } from 'src/schemas/area.schema';
import { CreateAreaDto } from 'src/dto/area/CreateAreaDto';
import { StreetHouseDocument } from 'src/schemas/streetHouse.schema';
import { UpdateAreaDto } from 'src/dto/area/UpdateAreaDto';
import mongodb from 'mongodb';
import { ApartmentService } from './apartment.service';
export declare class AreaService {
    private areaModel;
    private streetHouseModel;
    private apartmentService;
    constructor(areaModel: Model<AreaDocument>, streetHouseModel: Model<StreetHouseDocument>, apartmentService: ApartmentService);
    create(createAreaDto: CreateAreaDto): Promise<Area & Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<Area[]>;
    get(id: string): Promise<Area>;
    update(id: string, updateAreaDto: UpdateAreaDto): Promise<Area>;
    delete(id: string): Promise<mongodb.DeleteResult>;
    private createStreetHouses;
    private removeStreetHouses;
}
