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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const subscription_service_1 = require("./subscription.service");
const auth_guard_1 = require("../../common/guards/auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let PaymentsController = class PaymentsController {
    constructor(paymentsService, subscriptionService) {
        this.paymentsService = paymentsService;
        this.subscriptionService = subscriptionService;
    }
    async getSubscriptionPlans() {
        return this.subscriptionService.getAllPlans();
    }
    async getCurrentSubscription(user) {
        return this.subscriptionService.getUserSubscription(user.id);
    }
    async createOrder(amount) {
        const orderId = await this.paymentsService.createOrder(amount);
        return { orderId };
    }
    async capturePayment(orderId, planId, user) {
        const payment = await this.paymentsService.capturePayment(orderId);
        if (payment.status === 'COMPLETED') {
            await this.subscriptionService.createSubscription(user.id, planId, orderId);
        }
        return payment;
    }
    async cancelSubscription(subscriptionId, user) {
        return this.subscriptionService.cancelSubscription(subscriptionId);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Get)('subscription-plans'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getSubscriptionPlans", null);
__decorate([
    (0, common_1.Get)('my-subscription'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getCurrentSubscription", null);
__decorate([
    (0, common_1.Post)('create-order'),
    __param(0, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('capture-payment'),
    __param(0, (0, common_1.Body)('orderId')),
    __param(1, (0, common_1.Body)('planId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "capturePayment", null);
__decorate([
    (0, common_1.Post)('cancel-subscription'),
    __param(0, (0, common_1.Body)('subscriptionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "cancelSubscription", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGraud),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService,
        subscription_service_1.SubscriptionService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map