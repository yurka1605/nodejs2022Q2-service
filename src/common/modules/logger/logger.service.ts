import { ConsoleLogger, Injectable, LogLevel, Optional } from '@nestjs/common';
import { getLogLevels } from 'src/common/helpers/getLogLevel';
import { WriteLogService } from 'src/common/services/write-logs.service';

@Injectable()
export class AppLogger extends ConsoleLogger {
  private excludeWriteToFileCtxList = [
    'NestFactory',
    'InstanceLoader',
    'RouterExplorer',
    'RoutesResolver',
    'NestApplication',
  ];

  constructor(
    context = 'APP',
    @Optional() private readonly writeLogService?: WriteLogService,
  ) {
    super(context, {
      logLevels: getLogLevels(+process.env.LOG_LEVEL),
    });
    this.debug(`Init Logger with context ${context}`);
  }

  debug(message: string, context?: string): void {
    this.writeLogToFile(message, 'debug', context);
    if (message) {
      super.debug(message, context);
    }
  }

  error(message: string, trace?: string, context?: string): void {
    this.writeLogToFile(message, 'error', context);
    if (message) {
      super.error(message, trace, context);
    }
  }

  log(message: string, context?: string): void {
    this.writeLogToFile(message, 'log', context);
    if (message) {
      super.log(message, context);
    }
  }

  warn(message: string, context?: string): void {
    this.writeLogToFile(message, 'warn', context);
    if (message) {
      super.warn(message, context);
    }
  }

  verbose(message: string, context?: string): void {
    this.writeLogToFile(message, 'verbose', context);
    if (message) {
      super.verbose(message, context);
    }
  }

  private writeLogToFile(message: string, logLvl: LogLevel, ctx: string): void {
    if (
      this.writeLogService &&
      this.isLevelEnabled(logLvl) &&
      !this.excludeWriteToFileCtxList.includes(ctx)
    ) {
      this.writeLogService.write(message);
    }
  }
}
