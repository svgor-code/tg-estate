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
import { UserService } from './user.service';
import { TelegramService } from './telegram.service';
import { CreatedUserSubscription } from 'src/interfaces/UserSubscription';

@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectModel(UserSubscription.name)
    private userSubscriptionModel: Model<UserSubscriptionDocument>,
    private subscriptionService: SubscriptionService,
    private userService: UserService,
  ) {}

  async findAll(filters?: {
    isActive?: boolean;
  }): Promise<CreatedUserSubscription[]> {
    return await this.userSubscriptionModel.find(filters).exec();
  }

  async getByUserId(
    userId: string,
    isActive?: boolean
  ): Promise<CreatedUserSubscription> {
    const userSubscriptionFilter: { user: string; isActive?: boolean } = {
      user: userId,
    };

    if (isActive !== undefined) {
      userSubscriptionFilter.isActive = isActive;
    }

    return await this.userSubscriptionModel
      .findOne(userSubscriptionFilter)
      .populate('subscription')
      .exec();
  }

  async create(
    userId: string,
    subscriptionId: string,
    providerPaymentChargeId?: string,
    telegramPaymentChargeId?: string,
  ): Promise<CreatedUserSubscription> {
    const startedAt = moment().utc();
    const { days } = await this.subscriptionService.getOne(subscriptionId);
    const endedAt = moment(startedAt).utc().add(days, 'days');

    return await this.userSubscriptionModel.create({
      user: userId,
      subscription: subscriptionId,
      isActive: true,
      startedAt: startedAt.toDate(),
      endedAt: endedAt.toDate(),
      providerPaymentChargeId,
      telegramPaymentChargeId,
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

  async disableSubscription(id: string) {
    const userSubscription = await this.userSubscriptionModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            isActive: false,
          },
        },
        {
          new: true,
        }
      )
      .exec();

    const user = await this.userService.getUserById(
      userSubscription.user.toString()
    );

    await this.userService.switchSearch(user._id, false);

    return { user, userSubscription };
  }
}
