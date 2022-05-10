import { Module } from '@nestjs/common';
import { TelegramService } from 'src/services/telegram.service';
import { SubscriptionModule } from './subscription.module';
import { UserModule } from './user.module';
import { UserSubscriptionModule } from './userSubscription.module';

@Module({
  imports: [UserModule, SubscriptionModule, UserSubscriptionModule],
  controllers: [],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
