import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop({ type: Number, required: true, default: 0 })
  price: number;

  @Prop({ type: Number, required: true, default: 0 })
  days: number;

  @Prop({ type: Boolean, required: true, default: false })
  isDisposable: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isInitial: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
