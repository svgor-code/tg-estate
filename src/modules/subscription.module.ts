import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionController } from 'src/controllers/subscription.controller';
import { Subscription, SubscriptionSchema } from 'src/schemas/subscription.schema';
import { SubscriptionService } from 'src/services/subscription.service';

@Module({
  controllers: [SubscriptionController],
  imports: [
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
  ],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
