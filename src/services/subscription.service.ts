import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from 'src/schemas/subscription.schema';
import { CreateSubscriptionDto } from 'src/dto/subscription/CreateSubscriptionDto';
import { UpdateSubscriptionDto } from 'src/dto/subscription/UpdateSubscriptionDto';
import {
  CreatedSubscription,
  SubscriptionFilter,
} from 'src/interfaces/Subscription';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>
  ) {}

  async findAll(filters?: SubscriptionFilter): Promise<CreatedSubscription[]> {
    return await this.subscriptionModel.find({ ...(filters || {}) }).exec();
  }

  async getOne(id: string): Promise<CreatedSubscription> {
    return await this.subscriptionModel.findById(id).exec();
  }

  async create(
    subscription: CreateSubscriptionDto
  ): Promise<CreatedSubscription> {
    if (subscription.isInitial) {
      await this.switchInitial();
    }

    return await this.subscriptionModel.create(subscription);
  }

  async update(
    id: string,
    subscription: UpdateSubscriptionDto
  ): Promise<CreatedSubscription> {
    if (subscription.isInitial) {
      await this.switchInitial();
    }

    return await this.subscriptionModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            ...subscription,
          },
        },
        {
          new: true,
        }
      )
      .exec();
  }

  async delete(id: string) {
    try {
      await this.subscriptionModel.findByIdAndRemove(id).exec();
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  private async switchInitial() {
    await this.subscriptionModel
      .updateOne(
        {
          isInitial: true,
        },
        {
          $set: {
            isInitial: false,
          },
        },
        {
          new: true,
        }
      )
      .exec();
  }
}
