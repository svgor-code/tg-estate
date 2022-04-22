import { Model } from 'mongoose';
import { IStreet } from 'src/interfaces/street.interface';
import { Street, StreetDocument } from 'src/schemas/street.schema';
import { CreateStreetDto } from 'src/dto/street/CreateStreetDto';
import mongodb from 'mongodb';
import { UpdateStreetDto } from 'src/dto/street/UpdateStreetDto';
export declare class StreetService {
    private streetModel;
    constructor(streetModel: Model<StreetDocument>);
    get(id: string): Promise<Street>;
    create(createStreetDto: CreateStreetDto): Promise<Street>;
    bulkCreate(streets: CreateStreetDto[]): Promise<Street[]>;
    findAll(): Promise<IStreet[]>;
    update(id: string, updateStreetDto: UpdateStreetDto): Promise<Street>;
    delete(id: string): Promise<mongodb.DeleteResult>;
}
