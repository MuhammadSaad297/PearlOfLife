import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionPlan } from './models/subscription-plan.model';
import { UserSubscription } from './models/user-subscription.model';
import { PaymentsService } from './payments.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(SubscriptionPlan)
    private subscriptionPlanModel: typeof SubscriptionPlan,
    @InjectModel(UserSubscription)
    private userSubscriptionModel: typeof UserSubscription,
    private paymentService: PaymentsService,
  ) {}
  async getAllPlans() {
    try {
      return await this.subscriptionPlanModel.findAll({
        where: { isActive: true },
      });
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      throw new Error('Failed to fetch subscription plans');
    }
  }

  async getUserSubscription(userId: string) {
    try {
      return await this.userSubscriptionModel.findOne({
        where: {
          userId,
          status: 'active',
        },
        include: [SubscriptionPlan],
      });
    } catch (error) {
      console.error('Error fetching user subscription:', error);
      throw new Error('Failed to fetch user subscription');
    }
  }

  async createSubscription(
    userId: string,
    planId: string,
    paypalOrderId: string,
  ) {
    // Calculate subscription end date (30 days from now)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    return this.userSubscriptionModel.create({
      userId,
      planId,
      startDate,
      endDate,
      status: 'active',
      paypalOrderId,
    });
  }

  async cancelSubscription(subscriptionId: string) {
    return this.userSubscriptionModel.update(
      { status: 'cancelled' },
      { where: { id: subscriptionId } },
    );
  }
}
