import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaymentsService {
  private client: paypal.core.PayPalHttpClient;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private configService: ConfigService) {
    const mode =
      this.configService.get('NODE_ENV') === 'production' ? 'live' : 'sandbox';

    // Get credentials from environment
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

      // Initialize environment with trimmed credentials
      if (mode === 'live') {
        environment = new paypal.core.LiveEnvironment(
          credentials.clientId,
          credentials.clientSecret,
        );
        this.logger.log('Using PayPal Live Environment');
      } else {
        environment = new paypal.core.SandboxEnvironment(
          credentials.clientId,
          credentials.clientSecret,
        );
        this.logger.log('Using PayPal Sandbox Environment');
      }

      this.client = new paypal.core.PayPalHttpClient(environment);
      this.logger.log('PayPal client initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize PayPal client', {
        error: error.message,
        stack: error.stack,
      });
      throw new Error('Failed to initialize PayPal client: ' + error.message);
    }
  }

  async createOrder(planAmount: number): Promise<string> {
    this.logger.log(`Creating PayPal order for amount: ${planAmount}`);

    try {
      if (!this.client) {
        this.logger.error('PayPal client is not initialized');
        throw new Error('PayPal client is not initialized');
      }

      const request = new paypal.orders.OrdersCreateRequest();

      // Set preference for response format
      request.prefer('return=representation');

      // Set the request body directly
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
    } catch (err) {
      this.logger.error('Failed to create PayPal order', {
        error: err.message,
        stack: err.stack,
        details: err.details || err.data,
      });
      throw new Error(`Failed to create PayPal order: ${err.message}`);
    }
  }

  async capturePayment(orderId: string) {
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
    } catch (err) {
      this.logger.error('Failed to capture payment', {
        orderId,
        error: err.message,
        stack: err.stack,
        details: err.details || err.data,
      });
      throw new Error(`Failed to capture payment: ${err.message}`);
    }
  }
}
