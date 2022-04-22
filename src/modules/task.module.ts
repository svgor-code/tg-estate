import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TaskService } from 'src/services/task.service';
import { ParserModule } from './parser.module';

@Module({
  imports: [ParserModule],
  providers: [TaskService],
})
export class TaskModule {}
