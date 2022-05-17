import { ParserService } from './parser.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserSubscriptionService } from './userSubscription.service';
import moment from 'moment';
import { TelegramService } from './telegram.service';
import { YookassaService } from './yookassa.service';

/*

  * * * * * *
  | | | | | |
  | | | | | day of week
  | | | | months
  | | | day of month
  | | hours
  | minutes
  seconds (optional)

*/

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private parserService: ParserService,
    private userSubscriptionService: UserSubscriptionService,
    private telegramService: TelegramService,
    private yookassaService: YookassaService
  ) {}

  @Cron('50 * * * * *')
  startParseAvitoCatalog() {
    this.parserService.parseAvitoCatalog();
  }

  @Cron('*/30 * * * * *')
  async startCheckUsersSubscriptions() {
    this.logger.log('Start check subscriptions');

    const usersSubscriptions = await this.userSubscriptionService.findAll({
      isActive: true,
    });
    const currentDate = moment();

    await Promise.all(
      usersSubscriptions.map(async (userSubscription) => {
        try {
          if (currentDate > moment(userSubscription.endedAt)) {
            const { user } =
              await this.userSubscriptionService.disableSubscription(
                userSubscription._id
              );

            return await this.telegramService.sendSubscriptionDisabled(user);
          }

          return;
        } catch (error) {
          this.logger.error(error);
        }
      })
    );
  }

  @Cron('*/15 * * * * *')
  async checkWaitingPayments() {
    const paymentsList = await this.yookassaService.getPaymentList({
      status: 'waiting_for_capture',
    });

    await Promise.all(
      paymentsList.items.map(async (payment) => {
        await this.telegramService.captureSubscription(payment);
      })
    );
  }
}
