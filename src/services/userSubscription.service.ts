import moment from 'moment';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserSubscription,
  UserSubscriptionDocument,
} from 'src/schemas/userSubscription.schema';
import { SubscriptionService } from './subscription.service';
import { UpdateSubscriptionDto } from 'src/dto/subscription/UpdateSubscriptionDto';

@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectModel(UserSubscription.name)
    private userSubscriptionModel: Model<UserSubscriptionDocument>,
    private subscriptionService: SubscriptionService
  ) {}

  async findAll(): Promise<UserSubscription[]> {
    return await this.userSubscriptionModel.find().exec();
  }

  async create(
    userId: string,
    subscriptionId: string
  ): Promise<UserSubscription> {
    const startedAt = moment().utc();
    const { days } = await this.subscriptionService.getOne(subscriptionId);
    const endedAt = moment(startedAt).utc().add(days, 'days');

    return await this.userSubscriptionModel.create({
      user: userId,
      subscription: subscriptionId,
      isActive: true,
      startedAt: startedAt.toDate(),
      endedAt: endedAt.toDate(),
    });
  }

  async update(id: string, updateUserSubscriptionDto: UpdateSubscriptionDto) {
    return await this.userSubscriptionModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            ...updateUserSubscriptionDto,
          },
        },
        {
          new: true,
        }
      )
      .exec();
  }
}
