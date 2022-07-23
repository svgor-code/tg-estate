import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TaskService } from 'src/services/task.service';
import { ParserModule } from './parser.module';
import { UserSubscriptionModule } from './userSubscription.module';
import { TelegramModule } from './telegram.module';
import { YookassaModule } from './yookassa.module';
import { ApartmentModule } from './apartment.module';

@Module({
  imports: [
    ParserModule,
    UserSubscriptionModule,
    TelegramModule,
    YookassaModule,
    ApartmentModule,
  ],
  providers: [TaskService],
})
export class TaskModule {}
