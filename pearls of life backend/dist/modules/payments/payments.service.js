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
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const paypal = require("@paypal/checkout-server-sdk");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(PaymentsService_1.name);
        const mode = this.configService.get('NODE_ENV') === 'production' ? 'live' : 'sandbox';
        const finalClientId = this.configService.get('PAYPAL_CLIENT_ID');
        const finalClientSecret = this.configService.get('PAYPAL_CLIENT_SECRET');
        this.logger.debug('PayPal Configuration Details', {
            nodeEnv: this.configService.get('NODE_ENV'),
            mode: mode,
            clientIdFirstChars: finalClientId?.substring(0, 8),
            secretFirstChars: finalClientSecret?.substring(0, 8),
            configServiceInstance: !!this.configService,
        });
        if (!finalClientId || !finalClientSecret) {
            this.logger.error('PayPal client ID or secret is missing', {
                hasClientId: !!finalClientId,
                hasClientSecret: !!finalClientSecret,
                mode,
            });
            throw new Error('PayPal configuration is incomplete');
        }
        let environment;
        try {
            const credentials = {
                clientId: finalClientId.trim(),
                clientSecret: finalClientSecret.trim(),
            };
            if (mode === 'live') {
                environment = new paypal.core.LiveEnvironment(credentials.clientId, credentials.clientSecret);
                this.logger.log('Using PayPal Live Environment');
            }
            else {
                environment = new paypal.core.SandboxEnvironment(credentials.clientId, credentials.clientSecret);
                this.logger.log('Using PayPal Sandbox Environment');
            }
            this.client = new paypal.core.PayPalHttpClient(environment);
            this.logger.log('PayPal client initialized successfully');
        }
        catch (error) {
            this.logger.error('Failed to initialize PayPal client', {
                error: error.message,
                stack: error.stack,
            });
            throw new Error('Failed to initialize PayPal client: ' + error.message);
        }
    }
    async createOrder(planAmount) {
        this.logger.log(`Creating PayPal order for amount: ${planAmount}`);
        try {
            if (!this.client) {
                this.logger.error('PayPal client is not initialized');
                throw new Error('PayPal client is not initialized');
            }
            const request = new paypal.orders.OrdersCreateRequest();
            request.prefer('return=representation');
            request.requestBody({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: planAmount.toString(),
                        },
                    },
                ],
            });
            this.logger.debug('Executing PayPal request...');
            const response = await this.client.execute(request);
            if (!response || !response.result || !response.result.id) {
                throw new Error('Invalid response from PayPal');
            }
            this.logger.log('PayPal order created successfully', {
                orderId: response.result.id,
                status: response.result.status,
            });
            return response.result.id;
        }
        catch (err) {
            this.logger.error('Failed to create PayPal order', {
                error: err.message,
                stack: err.stack,
                details: err.details || err.data,
            });
            throw new Error(`Failed to create PayPal order: ${err.message}`);
        }
    }
    async capturePayment(orderId) {
        this.logger.debug(`Capturing payment for order: ${orderId}`);
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});
        try {
            if (!this.client) {
                this.logger.error('PayPal client is not initialized');
                throw new Error('PayPal client is not initialized');
            }
            const response = await this.client.execute(request);
            if (!response || !response.result) {
                throw new Error('Invalid response from PayPal during capture');
            }
            this.logger.log('Payment captured successfully', {
                orderId,
                status: response.result.status,
            });
            return response.result;
        }
        catch (err) {
            this.logger.error('Failed to capture payment', {
                orderId,
                error: err.message,
                stack: err.stack,
                details: err.details || err.data,
            });
            throw new Error(`Failed to capture payment: ${err.message}`);
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map