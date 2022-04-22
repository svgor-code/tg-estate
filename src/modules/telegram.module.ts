import { Module } from '@nestjs/common';
import { TelegramService } from 'src/services/telegram.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
