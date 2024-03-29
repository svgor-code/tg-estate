import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ParserModule } from './parser.module';
import { SubscriptionModule } from './subscription.module';
import { TaskModule } from './task.module';
import { TelegramModule } from './telegram.module';
import { UserSubscriptionModule } from './userSubscription.module';
import { YookassaModule } from './yookassa.module';

const mongoConnectionString = `mongodb://estate:ky5UnKQH@0.0.0.0:27018/tgestate?authSource=admin&readPreference=primary&directConnection=true&ssl=false`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoConnectionString),
    ScheduleModule.forRoot(),
    TaskModule,
    ParserModule,
    TelegramModule,
    SubscriptionModule,
    UserSubscriptionModule,
    YookassaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
