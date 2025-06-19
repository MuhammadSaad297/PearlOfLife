import { Model } from 'sequelize-typescript';
export declare class UserSubscription extends Model {
    id: string;
    userId: string;
    planId: string;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'cancelled' | 'expired';
    paypalSubscriptionId: string;
    paypalOrderId: string;
}
