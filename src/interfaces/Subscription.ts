import { Document } from 'mongoose';
import { Subscription } from 'src/schemas/subscription.schema';

export type CreatedSubscription = Subscription &
  Document<any, any, any> & {
    _id: any;
  };
