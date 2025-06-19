import { PaymentsService } from './payments.service';
import { SubscriptionService } from './subscription.service';
export declare class PaymentsController {
    private readonly paymentsService;
    private readonly subscriptionService;
    constructor(paymentsService: PaymentsService, subscriptionService: SubscriptionService);
    getSubscriptionPlans(): Promise<import("./models/subscription-plan.model").SubscriptionPlan[]>;
    getCurrentSubscription(user: any): Promise<import("./models/user-subscription.model").UserSubscription>;
    createOrder(amount: number): Promise<{
        orderId: string;
    }>;
    capturePayment(orderId: string, planId: string, user: any): Promise<any>;
    cancelSubscription(subscriptionId: string, user: any): Promise<[affectedCount: number]>;
}
