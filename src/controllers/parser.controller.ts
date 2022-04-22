import { Controller, Get, Param } from '@nestjs/common';
import { ParserService } from 'src/services/parser.service';

@Controller('parsers')
export class ParserController {
  constructor(
    private readonly parserService: ParserService
  ) {}

  @Get('/avito-catalog')
  async getAvitoCatalog(): Promise<string> {
    const result = await this.parserService.parseAvitoCatalog();

    return JSON.stringify(result);
  }
}
