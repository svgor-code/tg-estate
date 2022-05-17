import { Injectable, Logger } from '@nestjs/common';
import {
  ICapturePayment,
  ICreatePayment,
  IGetPaymentList,
  IPaymentList,
  Payment,
  YooCheckout,
} from '@a2seven/yoo-checkout';
import { CreatedSubscription } from 'src/interfaces/Subscription';
import { randomUUID } from 'crypto';

@Injectable()
export class YookassaService {
  private checkout = new YooCheckout({
    shopId: process.env.YOO_SHOP_ID,
    secretKey: process.env.YOO_SECRET,
  });
  private logger = new Logger(YookassaService.name);
  private idempotenceKey = randomUUID();

  async createPayment(
    userId: string,
    subscription: CreatedSubscription,
  ): Promise<Payment> {
    const subscriptionDescription = `${subscription.name} ${subscription.priceString}`;

    const createPayload: ICreatePayment = {
      amount: {
        value: `${subscription.price}`,
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: 'https://t.me/EstateNotificator_bot',
      },
      description: subscriptionDescription,
      metadata: {
        userId,
        subscriptionId: subscription._id,
      },
    };

    try {
      const payment = await this.checkout.createPayment(
        createPayload,
        this.idempotenceKey
      );

      this.logger.log(`Created new payment: ${JSON.stringify(payment)}`);

      return payment;
    } catch (error) {
      this.logger.error(`${this.createPayment.name}: ${JSON.stringify(error)}`);
    }
  }

  async getPayment(paymentId: string): Promise<Payment> {
    try {
      const payment = await this.checkout.getPayment(paymentId);

      return payment;
    } catch (error) {
      this.logger.error(`${this.getPayment.name}: ${JSON.stringify(error)}`);
    }
  }

  async capturePayment(
    paymentId: string,
    capturePayload: ICapturePayment
  ): Promise<Payment> {
    try {
      const payment = await this.checkout.capturePayment(
        paymentId,
        capturePayload,
        this.idempotenceKey
      );
      return payment;
    } catch (error) {
      this.logger.error(
        `${this.capturePayment.name}: ${JSON.stringify(error)}`
      );
    }
  }

  async cancelPayment(paymentId: string): Promise<Payment> {
    try {
      const payment = await this.checkout.cancelPayment(
        paymentId,
        this.idempotenceKey
      );
      return payment;
    } catch (error) {
      this.logger.error(`${this.cancelPayment.name}: ${JSON.stringify(error)}`);
    }
  }

  async getPaymentList(filters: IGetPaymentList): Promise<IPaymentList> {
    try {
      const paymentList = await this.checkout.getPaymentList(filters);
      return paymentList;
    } catch (error) {
      this.logger.error(
        `${this.getPaymentList.name}: ${JSON.stringify(error)}`
      );
    }
  }
}
