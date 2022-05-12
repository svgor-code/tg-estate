import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubscriptionSchema, UserSubscription } from 'src/schemas/userSubscription.schema';
import { UserSubscriptionService } from 'src/services/userSubscription.service';
import { SubscriptionModule } from './subscription.module';
import { TelegramModule } from './telegram.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserSubscription.name, schema: UserSubscriptionSchema }]),
    SubscriptionModule,
    UserModule,
  ],
  providers: [UserSubscriptionService],
  exports: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
