import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { getLogLevels } from 'src/common/helpers/getLogLevel';
import { WriteLogService } from 'src/common/services/write-logs.service';

@Injectable()
export class AppLogger extends ConsoleLogger {
  constructor(
    context: string,
    private readonly writeLogService: WriteLogService,
  ) {
    super(context, { logLevels: getLogLevels(+process.env.LOG_LEVEL) });
    this.debug(`Init Logger with context ${context}`);
  }

  debug(message: string, context?: string): void {
    this.writeLogToFile(message, 'debug');
    super.debug(message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    this.writeLogToFile(message, 'error');
    super.error(message, trace, context);
  }

  log(message: string, context?: string): void {
    this.writeLogToFile(message, 'log');
    super.log(message, context);
  }

  warn(message: string, context?: string): void {
    this.writeLogToFile(message, 'warn');
    super.warn(message, context);
  }

  verbose(message: string, context?: string): void {
    this.writeLogToFile(message, 'verbose');
    super.verbose(message, context);
  }

  private writeLogToFile(message: string, logLvl: LogLevel): void {
    if (this.isLevelEnabled(logLvl)) {
      this.writeLogService.write(message);
    }
  }
}
