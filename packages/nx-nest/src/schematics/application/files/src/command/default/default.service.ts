import { Injectable, Logger } from '@nestjs/common'
import { Command, Positional } from 'nestjs-command'

/**
 * Register your Commands here! (both sync and async functions are fine)
 * All possible settings: https://www.npmjs.com/package/nestjs-command
 */

@Injectable()
export class DefaultService {
  private logger: Logger = new Logger(this.constructor.name)

  @Command({
    command: 'hello <name>',
    describe: 'Prints hello <name>',
    autoExit: true
  })
  async helloWorld (
  @Positional({
    name: 'name'
  })
    name: string
  ) {
    this.logger.log(`Hello ${name}`)
  }
}
