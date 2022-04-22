import mongodb from 'mongodb';
import { CreateApartmentStateDto } from 'src/dto/apartmentState/CreateApartmentStateDto';
import { ApartmentState } from 'src/schemas/apartmentState.schema';
import { ApartmentStateService } from 'src/services/apartmentState.service';
import { UpdateApartmentStateDto } from 'src/dto/apartmentState/UpdateApartmentStateDto';
export declare class ApartmentStateController {
    private apartmentStateService;
    constructor(apartmentStateService: ApartmentStateService);
    create(createApartmentStateDto: CreateApartmentStateDto): Promise<ApartmentState>;
    findAll(): Promise<ApartmentState[]>;
    bulkUpdate(updateApartmentStateDto: UpdateApartmentStateDto[]): Promise<ApartmentState[]>;
    delete(id: string): Promise<mongodb.DeleteResult>;
}
