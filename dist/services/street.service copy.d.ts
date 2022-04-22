import { Model } from 'mongoose';
import { Street, StreetDocument } from 'src/schemas/street.schema';
import { CreateStreetDto } from 'src/dto/street/CreateStreetDto';
export declare class StreetService {
    private streetModel;
    constructor(streetModel: Model<StreetDocument>);
    create(createStreetDto: CreateStreetDto): Promise<Street>;
    findAll(): Promise<Street[]>;
}
