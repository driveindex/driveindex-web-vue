import * as process from "process";

export const LoggerOption = {
  isEnabled: true,
  logLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
}

import {Log} from "vuejs3-logger";
import {inject} from "vue";

export class log {
  private static logger: Log | undefined = inject('vuejs3-logger')

  public static debug(...args: any[]): void {
    log.logger?.debug(...args)
  }

  public static error(...args: any[]): void {
    log.logger?.error(...args)
  }

  public static fatal(...args: any[]): void {
    log.logger?.fatal(...args)
  }

  public static info(...args: any[]): void {
    log.logger?.info(...args)
  }

  public static warn(...args: any[]): void {
    log.logger?.warn(...args)
  }
}
