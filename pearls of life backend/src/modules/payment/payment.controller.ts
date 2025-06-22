import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGraud } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PaymentsService } from './payment.service';
import { SubscriptionService } from './subsription.service';

@Controller('payments')
@UseGuards(AuthGraud)
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly subscriptionService: SubscriptionService,
  ) {}
  @Get('subscription-plans')
  async getSubscriptionPlans() {
    return this.subscriptionService.getAllPlans();
  }

  @Get('my-subscription')
  async getCurrentSubscription(@CurrentUser() user: any) {
    return this.subscriptionService.getUserSubscription(user.id);
  }

  @Post('create-order')
  async createOrder(@Body('amount') amount: number) {
    const orderId = await this.paymentsService.createOrder(amount);
    return { orderId };
  }

  @Post('capture-payment')
  async capturePayment(
    @Body('orderId') orderId: string,
    @Body('planId') planId: string,
    @CurrentUser() user: any,
  ) {
    const payment = await this.paymentsService.capturePayment(orderId);

    // Create subscription after successful payment
    if (payment.status === 'COMPLETED') {
      await this.subscriptionService.createSubscription(
        user.id,
        planId,
        orderId,
      );
    }

    return payment;
  }

  @Post('cancel-subscription')
  async cancelSubscription(
    @Body('subscriptionId') subscriptionId: string,
    @CurrentUser() user: any,
  ) {
    return this.subscriptionService.cancelSubscription(subscriptionId);
  }
}
