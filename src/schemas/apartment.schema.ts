import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApartmentDocument = Apartment & Document;

@Schema()
export class Apartment {
  @Prop({ type: String, required: true, default: '' })
  platformId: string;

  @Prop({ type: String, required: true, default: '' })
  title: string;

  @Prop({ type: String, required: true, default: '' })
  href: string;

  @Prop({ type: Number, required: true, default: 0 })
  price: number;

  @Prop({ type: Number, required: false })
  pricePerMeter: number;

  @Prop({ type: String, required: true, default: '' })
  address: string;

  @Prop({ type: Number, required: false })
  rooms: number;

  @Prop({ type: Number, required: true })
  square: number;

  @Prop({ type: Number, required: true })
  floor: number;

  @Prop({ type: String, required: true, default: '' })
  district: string;

  @Prop({ type: String, required: true, default: '0' })
  sellerType: string;

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
