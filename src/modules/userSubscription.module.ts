import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSubscriptionSchema, UserSubscription } from 'src/schemas/userSubscription.schema';
import { UserSubscriptionService } from 'src/services/userSubscription.service';
import { SubscriptionModule } from './subscription.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserSubscription.name, schema: UserSubscriptionSchema }]),
    SubscriptionModule,
  ],
  providers: [UserSubscriptionService],
  exports: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
