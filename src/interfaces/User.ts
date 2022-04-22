import { Document } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export type CreatedUser = User &
  Document<any, any, any> & {
    _id: any;
  };

export type UserFilters = {
  isSearchActive: boolean;
}