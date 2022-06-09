import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserSubscription } from './userSubscription.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Number, required: true, unique: true })
  chatId: number;

  @Prop({ type: Number, required: false })
  tgUserId: number;

  @Prop({ type: String, required: false })
  tgUserName: string;

  @Prop({ type: Boolean, required: true, default: false })
  isSearchActive: boolean;

  @Prop({ type: String, required: false })
  roomsFilter: string;

  @Prop({ type: String, required: false })
  districtsFilter: string;

  @Prop({ type: String, require: true, default: '{"0": false, "1": true}' })
  sellerTypesFilter: string;

  @Prop({ type: Number, required: false })
  maxPriceFilter: number;

  @Prop({ type: Number, required: true, default: 1 })
  minFloorFilter: number;

  @Prop({ type: Number, required: true, default: 24 })
  maxFloorFilter: number;

  @Prop({ type: Number, required: false })
  minSquareFilter: number;

  @Prop({ type: Number, required: false })
  maxSquareFilter: number;

  @Prop({ type: [{ type: String, required: false }] })
  sendedApartments: string[];

  @Prop({ type: String, required: true, default: 'user' })
  role: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSubscription',
    required: false,
    default: null,
  })
  subscription: UserSubscription;
}

export const UserSchema = SchemaFactory.createForClass(User);
