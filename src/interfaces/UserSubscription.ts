import { Document } from 'mongoose';
import { UserSubscription } from 'src/schemas/userSubscription.schema';

export type CreatedUserSubscription = UserSubscription &
  Document<any, any, any> & {
    _id: any;
  };
