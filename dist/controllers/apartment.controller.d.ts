import { IApartment } from 'src/interfaces/IApartment';
import { ApartmentService } from 'src/services/apartment.service';
export declare class ApartmentController {
    private readonly apartmentService;
    constructor(apartmentService: ApartmentService);
    filterApartments(apartments: IApartment[]): Promise<{
        success: boolean;
        error?: string;
    }>;
}
