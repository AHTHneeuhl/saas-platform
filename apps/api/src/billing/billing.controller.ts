import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import Stripe from 'stripe';

import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from './stripe/stripe.service';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly stripe: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('checkout')
  async checkout(@Body() body: { customerId: string; priceId: string }) {
    return this.stripe.createCheckoutSession(body.customerId, body.priceId);
  }

  @Post('portal')
  async portal(@Body() body: { customerId: string }) {
    return this.stripe.createBillingPortal(body.customerId);
  }

  @Post('webhook')
  async webhook(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    const event = this.stripe.client.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      void session;
    }

    if (event.type === 'customer.subscription.created') {
      const sub = event.data.object as Stripe.Subscription;

      const item = sub.items.data[0];

      const start = item?.current_period_start
        ? new Date(item.current_period_start * 1000)
        : new Date();

      const end = item?.current_period_end
        ? new Date(item.current_period_end * 1000)
        : new Date();

      await this.prisma.subscription.update({
        where: {
          organizationId: sub.metadata.organizationId,
        },
        data: {
          stripeCustomerId: String(sub.customer),
          stripeSubscriptionId: sub.id,
          status: sub.status,
          plan: item?.price.id ?? 'unknown',
          currentPeriodStart: start,
          currentPeriodEnd: end,
        },
      });
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription;

      await this.prisma.subscription.update({
        where: {
          organizationId: sub.metadata.organizationId,
        },
        data: {
          status: 'canceled',
        },
      });
    }

    return { received: true, type: event.type };
  }
}
