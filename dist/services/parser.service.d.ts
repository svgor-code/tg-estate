import { ApartmentService } from './apartment.service';
export declare class ParserService {
    private apartmentService;
    private readonly logger;
    constructor(apartmentService: ApartmentService);
    parseAvitoCatalog(): Promise<{
        apartments: any[];
        status: boolean;
        error?: Error;
    }>;
}
