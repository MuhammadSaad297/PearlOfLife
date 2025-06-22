import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaymentsService {
  private client: paypal.core.PayPalHttpClient;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private configService: ConfigService) {
    const mode = this.configService.get('PAYPAL_MODE') || 'live';

    // Get credentials from environment
    const finalClientId = this.configService.get('PAYPAL_CLIENT_ID');
    const finalClientSecret = this.configService.get('PAYPAL_CLIENT_SECRET');

    // More detailed logging
    const masked = (val?: string) =>
      val
        ? val.substring(0, 4) + '...' + val.substring(val.length - 4)
        : undefined;
    this.logger.debug('PayPal Configuration', {
      mode,
      clientIdLength: finalClientId?.length,
      secretLength: finalClientSecret?.length,
      clientIdPrefix: finalClientId?.substring(0, 10),
      PAYPAL_CLIENT_ID: masked(finalClientId),
      PAYPAL_CLIENT_SECRET: masked(finalClientSecret),
      PAYPAL_MODE: mode,
    });
    if (mode === 'live' && finalClientId?.includes(':')) {
      this.logger.warn(
        'PayPal client ID looks like a sandbox credential but PAYPAL_MODE is set to live. This will not work.',
      );
    }

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
        envMode: mode,
      });
      throw new Error('Failed to initialize PayPal client: ' + error.message);
    }
  }

  // async createOrder(planAmount: number): Promise<string> {
  //   this.logger.log(`Creating PayPal order for amount: ${planAmount}`);

  //   try {
  //     if (!this.client) {
  //       this.logger.error('PayPal client is not initialized');
  //       throw new Error('PayPal client is not initialized');
  //     }

  //     const request = new paypal.orders.OrdersCreateRequest();

  //     // Set preference for response format
  //     request.prefer('return=representation');

  //     // Set the request body directly
  //     request.requestBody({
  //       intent: 'CAPTURE',
  //       purchase_units: [
  //         {
  //           amount: {
  //             currency_code: 'USD',
  //             value: planAmount.toString(),
  //           },
  //         },
  //       ],
  //     });

  //     this.logger.debug('Executing PayPal request...');

  //     const response = await this.client.execute(request);

  //     if (!response || !response.result || !response.result.id) {
  //       throw new Error('Invalid response from PayPal');
  //     }

  //     this.logger.log('PayPal order created successfully', {
  //       orderId: response.result.id,
  //       status: response.result.status,
  //     });

  //     return response.result.id;
  //   } catch (err) {
  //     this.logger.error('Failed to create PayPal order', {
  //       error: err.message,
  //       stack: err.stack,
  //       details: err.details || err.data,
  //     });
  //     throw new Error(`Failed to create PayPal order: ${err.message}`);
  //   }
  // }
  async createOrder(planAmount: number): Promise<string> {
    this.validatePayPalClient();
    this.validatePlanAmount(planAmount);

    try {
      const request = this.buildCreateOrderRequest(planAmount);
      const response = await this.executePayPalRequest(request);

      return this.handleCreateOrderResponse(response);
    } catch (err) {
      this.handleCreateOrderError(err);
      throw err; // Re-throw after logging
    }
  }

  private validatePayPalClient(): void {
    if (!this.client) {
      this.logger.error('PayPal client is not initialized');
      throw new Error('PayPal client is not initialized');
    }
  }

  private validatePlanAmount(planAmount: number): void {
    if (typeof planAmount !== 'number' || planAmount <= 0) {
      this.logger.error('Invalid plan amount', { planAmount });
      throw new Error('Plan amount must be a positive number');
    }
  }

  private buildCreateOrderRequest(
    planAmount: number,
  ): paypal.orders.OrdersCreateRequest {
    this.logger.log(`Building PayPal order request for amount: ${planAmount}`);

    if (
      typeof planAmount !== 'number' ||
      isNaN(planAmount) ||
      planAmount <= 0
    ) {
      this.logger.error('Invalid planAmount for PayPal order', { planAmount });
      throw new Error('planAmount must be a positive number');
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');

    // Ensure value is a string with two decimals
    const value = planAmount.toFixed(2);
    const requestBody = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value,
          },
        },
      ],
    };

    this.logger.debug('Prepared PayPal order request body', { requestBody });
    request.requestBody(requestBody);

    return request;
  }

  private async executePayPalRequest(
    request: paypal.orders.OrdersCreateRequest,
  ): Promise<paypal.core.HttpResponse<paypal.orders.Order>> {
    // Log the request body just before execution
    this.logger.debug('About to execute PayPal request', {
      requestBody: (request as any).body || undefined,
    });
    return await this.client.execute(request);
  }

  private handleCreateOrderResponse(
    response: paypal.core.HttpResponse<paypal.orders.Order>,
  ): string {
    if (!response?.result?.id) {
      this.logger.error('Invalid PayPal response structure', { response });
      throw new Error('Invalid response structure from PayPal');
    }

    this.logger.log('PayPal order created successfully', {
      orderId: response.result.id,
      status: response.result.status,
      debugId: response.headers['paypal-debug-id'],
    });

    return response.result.id;
  }

  private handleCreateOrderError(err: any): void {
    this.logger.error('Failed to create PayPal order', {
      error: err.message,
      stack: err.stack,
      details: err.details || err.data,
      debugId: err.headers?.['paypal-debug-id'],
    });
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
