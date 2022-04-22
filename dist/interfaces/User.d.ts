import { Document } from 'mongoose';
import { User } from 'src/schemas/user.schema';
export declare type CreatedUser = User & Document<any, any, any> & {
    _id: any;
};
export declare type UserFilters = {
    isSearchActive: boolean;
};
