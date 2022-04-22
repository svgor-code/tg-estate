import mongodb from 'mongodb';
import { Area } from 'src/schemas/area.schema';
import { CreateAreaDto } from 'src/dto/area/CreateAreaDto';
import { UpdateAreaDto } from 'src/dto/area/UpdateAreaDto';
import { AreaService } from 'src/services/area.service';
import { ApartmentService } from 'src/services/apartment.service';
export declare class AreaController {
    private areaService;
    private apartmentService;
    constructor(areaService: AreaService, apartmentService: ApartmentService);
    create(createAreaDto: CreateAreaDto): Promise<Area>;
    update(id: string, updateAreaDto: UpdateAreaDto): Promise<Area>;
    findAll(): Promise<Area[]>;
    get(id: string): Promise<Area>;
    delete(id: string): Promise<mongodb.DeleteResult>;
}
