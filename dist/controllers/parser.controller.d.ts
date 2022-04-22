import { ParserService } from 'src/services/parser.service';
export declare class ParserController {
    private readonly parserService;
    constructor(parserService: ParserService);
    getAvitoCatalog(): Promise<string>;
}
