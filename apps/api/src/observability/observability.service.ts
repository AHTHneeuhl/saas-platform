import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics } from 'prom-client';

@Injectable()
export class ObservabilityService {
  constructor() {
    collectDefaultMetrics();
  }
}
