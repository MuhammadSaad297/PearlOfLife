import { SubscriptionPlan } from './models/subscription-plan.model';
import { UserSubscription } from './models/user-subscription.model';
import { PaymentsService } from './payments.service';
export declare class SubscriptionService {
    private subscriptionPlanModel;
    private userSubscriptionModel;
    private paymentService;
    constructor(subscriptionPlanModel: typeof SubscriptionPlan, userSubscriptionModel: typeof UserSubscription, paymentService: PaymentsService);
    getAllPlans(): Promise<SubscriptionPlan[]>;
    getUserSubscription(userId: string): Promise<UserSubscription>;
    createSubscription(userId: string, planId: string, paypalOrderId: string): Promise<UserSubscription>;
    cancelSubscription(subscriptionId: string): Promise<[affectedCount: number]>;
}
