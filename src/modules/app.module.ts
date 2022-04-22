import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ParserModule } from './parser.module';
import { TaskModule } from './task.module';
import { TelegramModule } from './telegram.module';

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_DB } = process.env;

const mongoConnectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@estate-server-mongo-1:${MONGO_PORT}/${MONGO_DB}-new?authSource=admin&readPreference=primary&directConnection=true&ssl=false`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoConnectionString),
    ScheduleModule.forRoot(),
    TaskModule,
    ParserModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
