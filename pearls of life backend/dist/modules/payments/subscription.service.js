"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const subscription_plan_model_1 = require("./models/subscription-plan.model");
const user_subscription_model_1 = require("./models/user-subscription.model");
const payments_service_1 = require("./payments.service");
let SubscriptionService = class SubscriptionService {
    constructor(subscriptionPlanModel, userSubscriptionModel, paymentService) {
        this.subscriptionPlanModel = subscriptionPlanModel;
        this.userSubscriptionModel = userSubscriptionModel;
        this.paymentService = paymentService;
    }
    async getAllPlans() {
        try {
            return await this.subscriptionPlanModel.findAll({
                where: { isActive: true },
            });
        }
        catch (error) {
            console.error('Error fetching subscription plans:', error);
            throw new Error('Failed to fetch subscription plans');
        }
    }
    async getUserSubscription(userId) {
        try {
            return await this.userSubscriptionModel.findOne({
                where: {
                    userId,
                    status: 'active',
                },
                include: [subscription_plan_model_1.SubscriptionPlan],
            });
        }
        catch (error) {
            console.error('Error fetching user subscription:', error);
            throw new Error('Failed to fetch user subscription');
        }
    }
    async createSubscription(userId, planId, paypalOrderId) {
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
    async cancelSubscription(subscriptionId) {
        return this.userSubscriptionModel.update({ status: 'cancelled' }, { where: { id: subscriptionId } });
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(subscription_plan_model_1.SubscriptionPlan)),
    __param(1, (0, sequelize_1.InjectModel)(user_subscription_model_1.UserSubscription)),
    __metadata("design:paramtypes", [Object, Object, payments_service_1.PaymentsService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map