import { AppLogger } from './../modules/logger/logger.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger: AppLogger;

  constructor() {
    this.logger = new AppLogger('HTTP');
  }

  use(request: Request, response: Response, next: NextFunction) {
    const startDate = Date.now();
    response.on('finish', () => {
      const duration = Date.now() - startDate;
      const { method, originalUrl, body } = request;
      const { statusCode, statusMessage } = response;
      const bodyData = Object.keys(body).length ? JSON.stringify(body) : '';
      const message = `${method.toUpperCase()} ${originalUrl} ${bodyData} ${statusCode} ${statusMessage} ${duration}ms`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}

export default LogsMiddleware;
