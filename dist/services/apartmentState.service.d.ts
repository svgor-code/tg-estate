import mongodb from 'mongodb';
import { Model } from 'mongoose';
import { ApartmentState, ApartmentStateDocument } from 'src/schemas/apartmentState.schema';
import { CreateApartmentStateDto } from 'src/dto/apartmentState/CreateApartmentStateDto';
import { UpdateApartmentStateDto } from 'src/dto/apartmentState/UpdateApartmentStateDto';
export declare class ApartmentStateService {
    private apartmentStateModel;
    constructor(apartmentStateModel: Model<ApartmentStateDocument>);
    create(createApartmentStateDto: CreateApartmentStateDto): Promise<ApartmentState>;
    bulkUpdate(updateApartmentStateDto: UpdateApartmentStateDto[]): Promise<ApartmentState[]>;
    findAll(): Promise<ApartmentState[]>;
    delete(id: string): Promise<mongodb.DeleteResult>;
}
