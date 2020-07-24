import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import moment from 'moment'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { CacheLifetimeOptions, Request } from '../interface'
import { ConfigParam, Configurable } from '../provider/config'

export class CacheLifetimeHelperInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name)
  private readonly options: CacheLifetimeOptions

  constructor () {
    this.options = this.getOptionsFromConfig()
  }

  @Configurable()
  getOptionsFromConfig (
    @ConfigParam('cacheLifetime') cacheLifetimeOptions?: CacheLifetimeOptions
  ): CacheLifetimeOptions {
    return cacheLifetimeOptions
  }

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp()

    const request: Request = httpContext.getRequest()
    const reply: FastifyReply<any> = httpContext.getResponse()

    if (!request.state) {
      request.state = {}
    }

    request.state.setCacheLifetime = (lifetime: number, useExpiresHeader = this.options.defaultExpiresHeader): void => {
      request.state.caching = { lifetime, useExpiresHeader }
    }

    return next.handle().pipe(
      tap(() => {
        if (!request.state.caching && this.options.defaultLifetime) {
          request.state.setCacheLifetime(this.options.defaultLifetime, this.options.defaultExpiresHeader)
        }

        const { lifetime, useExpiresHeader } = request.state.caching || {}

        if (lifetime && !isNaN(lifetime) && lifetime > 0) {
          const headerName = useExpiresHeader ? this.options.expiresHeader : this.options.cacheControlHeader

          const value = useExpiresHeader
            ? `${moment().locale('en').add(lifetime, 'seconds').utc().format('ddd, DD MMM YYYY HH:mm:ss')} GMT`
            : `max-age=${lifetime}`

          this.logger.verbose(`Cache lifetime is ${lifetime}sec -> setting "${headerName}" to ${value}`)

          reply.header(headerName, value)
        } else {
          this.logger.debug('No cache lifetime set.')
        }
      })
    )
  }
}