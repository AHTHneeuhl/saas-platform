import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const sub = req.subscription;

    if (!sub || sub.status !== 'active') {
      throw new ForbiddenException('Subscription required');
    }

    return true;
  }
}
