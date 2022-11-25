import { LogLevel } from '@nestjs/common/services/logger.service';

export function getLogLevels(level: number): LogLevel[] {
  return <LogLevel[]>(
    ['error', 'warn', 'log', 'debug', 'verbose'].splice(0, level + 1)
  );
}
