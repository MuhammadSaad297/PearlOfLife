import { Model } from 'sequelize-typescript';
export declare class SubscriptionPlan extends Model {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string;
    isActive: boolean;
}
