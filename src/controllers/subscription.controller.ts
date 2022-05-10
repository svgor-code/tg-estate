import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubscriptionDto } from 'src/dto/subscription/CreateSubscriptionDto';
import { UpdateSubscriptionDto } from 'src/dto/subscription/UpdateSubscriptionDto';
import { CreatedSubscription } from 'src/interfaces/Subscription';
import { SubscriptionService } from 'src/services/subscription.service';

@Controller('/subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async findAll(): Promise<CreatedSubscription[]> {
    return await this.subscriptionService.findAll();
  }

  @Post()
  async create(
    @Body() subscription: CreateSubscriptionDto
  ): Promise<CreatedSubscription> {
    return await this.subscriptionService.create(subscription);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() subscription: UpdateSubscriptionDto
  ): Promise<CreatedSubscription> {
    return await this.subscriptionService.update(id, subscription);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string
  ): Promise<{ success: boolean; error?: string }> {
    return await this.subscriptionService.delete(id);
  }
}
