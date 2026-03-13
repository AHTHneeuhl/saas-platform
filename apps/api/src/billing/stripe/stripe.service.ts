import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-02-25.clover',
    });
  }

  get client() {
    return this.stripe;
  }

  async createCheckoutSession(customerId: string, priceId: string) {
    return this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/billing/success',
      cancel_url: 'http://localhost:3000/billing/cancel',
    });
  }

  async createBillingPortal(customerId: string) {
    return this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'http://localhost:3000/settings/billing',
    });
  }

  async createCustomer(email: string) {
    return this.stripe.customers.create({
      email,
    });
  }
}
