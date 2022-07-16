import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger: Logger;
  constructor() {
    this.logger = new Logger('App');
  }

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const startDate = Date.now();
    const req = ctx.switchToHttp().getRequest();

    return next
      .handle()
      .pipe(tap(() => {
        const duration = Date.now() - startDate;
        this.logger.log(`${req.method.toUpperCase()} ${req.url} ${duration}ms`);
      }));
  }
}