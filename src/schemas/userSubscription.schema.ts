import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Subscription } from './subscription.schema';
import { User } from './user.schema';

export type UserSubscriptionDocument = UserSubscription & Document;

@Schema()
export class UserSubscription {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: null,
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true,
    default: null,
  })
  subscription: Subscription;

  @Prop({ type: Boolean, required: true, default: false })
  isActive: boolean;

  @Prop({ type: Date, required: true, default: Date.now() })
  startedAt: Date;

  @Prop({ type: Date, required: true })
  endedAt: Date;
}

export const UserSubscriptionSchema = SchemaFactory.createForClass(UserSubscription);
