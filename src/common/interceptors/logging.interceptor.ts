import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLogger } from '../modules/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: AppLogger) {
    this.logger.setContext('APP');
  }

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const startDate = Date.now();
    const req = ctx.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startDate;
        this.logger.log(`${req.method.toUpperCase()} ${req.url} ${duration}ms`);
      }),
    );
  }
}
