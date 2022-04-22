import { ParserService } from './parser.service';
export declare class TaskService {
    private parserService;
    private readonly logger;
    constructor(parserService: ParserService);
    startParseAvitoCatalog(): void;
}
