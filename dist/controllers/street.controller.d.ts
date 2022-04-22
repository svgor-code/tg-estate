import { CreateStreetDto } from 'src/dto/street/CreateStreetDto';
import { Street } from 'src/schemas/street.schema';
import { StreetService } from 'src/services/street.service';
import mongodb from 'mongodb';
import { UpdateStreetDto } from 'src/dto/street/UpdateStreetDto';
export declare class StreetController {
    private streetService;
    constructor(streetService: StreetService);
    get(id: string): Promise<Street>;
    create(createStreetDto: CreateStreetDto): Promise<Street>;
    createMany(streets: CreateStreetDto[]): Promise<Street[]>;
    findAll(): Promise<Street[]>;
    update(id: string, updateStreetDto: UpdateStreetDto): Promise<any>;
    delete(id: string): Promise<mongodb.DeleteResult>;
}
