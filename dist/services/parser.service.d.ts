export declare class ParserService {
    private readonly logger;
    parseAvitoCatalog(): Promise<{
        apartments: any[];
        status: boolean;
        error?: Error;
    }>;
}
