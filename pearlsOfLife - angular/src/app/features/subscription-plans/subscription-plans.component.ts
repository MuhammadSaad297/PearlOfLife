import { Component, OnInit, NgZone } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss'],
})
export class SubscriptionPlansComponent implements OnInit {
  plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 3,
      description: 'Essential features for getting started',
      featuresList: [
        'Basic memory storage',
        'Limited key holders',
        'Standard support',
      ],
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: 10,
      description: 'Perfect for active users',
      featuresList: [
        'Enhanced memory storage',
        'Multiple key holders',
        'Priority support',
        'Advanced features',
      ],
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 25,
      description: 'Complete access to all features',
      featuresList: [
        'Unlimited memory storage',
        'Unlimited key holders',
        '24/7 Premium support',
        'All advanced features',
        'Custom branding options',
      ],
    },
  ];
  private paypalScriptLoaded = false;

  constructor(private paymentService: PaymentService, private ngZone: NgZone) {}

  ngOnInit() {
    this.loadPayPalScript().then(() => {
      this.initializePayPalButtons();
    });
  }

  private loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.paypalScriptLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${environment.paypalClientId}&currency=USD`;

      script.onload = () => {
        this.paypalScriptLoaded = true;
        resolve();
      };

      script.onerror = (error) => {
        console.error('PayPal SDK could not be loaded:', error);
        reject(error);
      };

      document.body.appendChild(script);
    });
  }

  private initializePayPalButtons() {
    this.plans.forEach((plan) => {
      // @ts-ignore
      window.paypal
        .Buttons({
          createOrder: () => {
            return this.paymentService
              .createOrder(plan.price)
              .toPromise()
              .then((response) => response?.orderId ?? '');
          },
          onApprove: (data: any) => {
            return this.ngZone.run(() => {
              return this.paymentService
                .capturePayment(data.orderID, plan.id)
                .toPromise()
                .then((details) => {
                  alert('Transaction completed successfully!');
                  // Handle successful subscription
                })
                .catch((error) => {
                  console.error('Payment capture failed:', error);
                  alert('Transaction failed. Please try again.');
                });
            });
          },
          onError: (err: any) => {
            console.error('PayPal button error:', err);
            alert('An error occurred. Please try again later.');
          },
        })
        .render(`#paypal-button-${plan.id}`);
    });
  }
}
