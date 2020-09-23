import { Injectable, Logger } from '@nestjs/common'
import { Interval, NestSchedule } from 'nest-schedule'

/**
 * Register your BgTasks here! (both sync and async functions are fine)
 * All possible schedule decorators: https://github.com/miaowing/nest-schedule
 */

@Injectable()
export class DefaultTaskService extends NestSchedule {
  private logger: Logger = new Logger(this.constructor.name)

  @Interval(1000)
  public intervalJob (): void {
    this.logger.debug('Another Message')
  }
}
