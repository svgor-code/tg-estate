import { IApartment } from 'src/interfaces/IApartment';
import { TelegramService } from './telegram.service';
import { UserService } from './user.service';
export declare class ApartmentService {
    private userService;
    private telegramService;
    private logger;
    constructor(userService: UserService, telegramService: TelegramService);
    filterApartments(apartments: IApartment[]): Promise<{
        success: boolean;
        error?: string;
    }>;
    private filterByRooms;
    private filterByDistrict;
    private getKeyByValue;
}
