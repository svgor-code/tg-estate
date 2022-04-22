import { CreateStreetDto } from 'src/dto/street/CreateStreetDto';
import { Street } from 'src/schemas/street.schema';
import { StreetService } from 'src/services/street.service';
export declare class StreetController {
    private streetService;
    constructor(streetService: StreetService);
    create(createStreetDto: CreateStreetDto): Promise<Street>;
    findAll(): Promise<Street[]>;
}
