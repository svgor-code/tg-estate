import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TaskService } from 'src/services/task.service';
import { ParserModule } from './parser.module';
import { UserSubscriptionModule } from './userSubscription.module';
import { TelegramModule } from './telegram.module';
import { YookassaModule } from './yookassa.module';

@Module({
  imports: [ParserModule, UserSubscriptionModule, TelegramModule, YookassaModule],
  providers: [TaskService],
})
export class TaskModule {}
