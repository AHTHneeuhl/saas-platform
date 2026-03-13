import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Counter } from 'prom-client';

@Injectable()
export class ObservabilityService {
  httpRequests = new Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
  });

  constructor() {
    collectDefaultMetrics();
  }
}
