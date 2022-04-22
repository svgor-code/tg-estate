import { ParserService } from './parser.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

/*

  * * * * * *
  | | | | | |
  | | | | | day of week
  | | | | months
  | | | day of month
  | | hours
  | minutes
  seconds (optional)

*/

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private parserService: ParserService,
  ) {}

  // @Cron('50 * * * * *')
  startParseAvitoCatalog() {
    this.parserService.parseAvitoCatalog();
  }
}
