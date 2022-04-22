import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/dto/user/CreateUserDto';
import { IRoomsFilter } from 'src/interfaces/IRoomsFilter';
import { CreatedUser, UserFilters } from 'src/interfaces/User';
import { IDistrictsFilter } from 'src/interfaces/IDistrictsFilter';
import { IApartment } from 'src/interfaces/IApartment';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<CreatedUser>;
    findAll(filter: Partial<UserFilters>): Promise<CreatedUser[]>;
    getUserByChatId(chatId: number): Promise<CreatedUser>;
    addNewSendedApartment(chatId: number, apartment: IApartment): Promise<CreatedUser>;
    switchSearch(userId: string, isSearchActive: boolean): Promise<CreatedUser>;
    updateRoomsFilter(userId: string, roomsFilter: IRoomsFilter): Promise<CreatedUser>;
    updateDistrictsFilter(userId: string, districtsFilter: IDistrictsFilter): Promise<CreatedUser>;
    updateMaxPriceFilter(userId: string, maxPrice: number): Promise<CreatedUser>;
    updateFloorFilter(userId: string, minFloorFilter: number, maxFloorFilter: number): Promise<CreatedUser>;
}
