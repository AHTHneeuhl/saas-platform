import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { ObservabilityService } from 'src/observability/observability.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly metrics: ObservabilityService) {}

  intercept(ctx: ExecutionContext, next: CallHandler) {
    const now = Date.now();

    this.metrics.httpRequests.inc();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this.metrics.httpRequestDuration.observe(duration);
      }),
    );
  }
}
