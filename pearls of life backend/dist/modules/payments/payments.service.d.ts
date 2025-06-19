import { ConfigService } from '@nestjs/config';
export declare class PaymentsService {
    private configService;
    private client;
    private readonly logger;
    constructor(configService: ConfigService);
    createOrder(planAmount: number): Promise<string>;
    capturePayment(orderId: string): Promise<any>;
}
