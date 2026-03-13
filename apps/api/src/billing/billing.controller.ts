import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { StripeService } from './stripe/stripe.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly stripe: StripeService) {}

  @Post('checkout')
  async checkout(@Body() body: { customerId: string; priceId: string }) {
    return this.stripe.createCheckoutSession(body.customerId, body.priceId);
  }

  @Post('webhook')
  async webhook(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    const event = this.stripe.client.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      void session;
    }

    if (event.type === 'customer.subscription.created') {
      const subscription = event.data.object;
      void subscription;
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      void subscription;
    }

    return { received: true, type: event.type };
  }
}
