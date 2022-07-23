import { Module } from '@nestjs/common';
import { ApartmentService } from 'src/services/apartment.service';
import { ApartmentController } from 'src/controllers/apartment.controller';
import { UserModule } from './user.module';
import { TelegramModule } from './telegram.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from 'src/schemas/apartment.schema';

@Module({
  imports: [
    UserModule,
    TelegramModule,
    MongooseModule.forFeature([
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
  ],
  providers: [ApartmentService],
  controllers: [ApartmentController],
  exports: [ApartmentService],
})
export class ApartmentModule {}
