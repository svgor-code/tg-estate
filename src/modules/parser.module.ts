import { Module } from '@nestjs/common';
import { ParserController } from 'src/controllers/parser.controller';
import { ParserService } from 'src/services/parser.service';

@Module({
  imports: [],
  providers: [ParserService],
  controllers: [ParserController],
  exports: [ParserService],
})
export class ParserModule {}
