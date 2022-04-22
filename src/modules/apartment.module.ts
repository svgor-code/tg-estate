import { Module } from '@nestjs/common';
import { ApartmentService } from 'src/services/apartment.service';
import { ApartmentController } from 'src/controllers/apartment.controller';
import { UserModule } from './user.module';
import { TelegramModule } from './telegram.module';

@Module({
  imports: [UserModule, TelegramModule],
  providers: [ApartmentService],
  controllers: [ApartmentController],
  exports: [ApartmentService],
})
export class ApartmentModule {}
