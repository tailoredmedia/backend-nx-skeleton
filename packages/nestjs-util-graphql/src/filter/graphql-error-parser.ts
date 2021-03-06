import { HttpStatus, Logger } from '@nestjs/common'
import type { GraphQLError, GraphQLFormattedError } from 'graphql/error'
import { EOL } from 'os'

import { GraphQLPreformattedException } from './graphql-exception.interface'
import { EnrichedExceptionError } from '@webundsoehne/nestjs-util'
import type { EnrichedException } from '@webundsoehne/nestjs-util'
import { formatValidationError, getErrorMessage, isValidationError, logErrorDebugMsg } from '@webundsoehne/nestjs-util/dist/filter/util'

export function GraphQLErrorParser (exception: GraphQLError): GraphQLFormattedError<EnrichedException> {
  let extensions = new EnrichedExceptionError({
    statusCode: exception.extensions?.exception?.statusCode ?? exception.extensions?.exception?.response?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    error: exception?.name ?? exception?.message,
    message: getErrorMessage(exception),
    service: exception.extensions?.exception?.response?.service
  })

  if (isValidationError(exception?.extensions?.exception)) {
    const errors = formatValidationError(exception.extensions.exception.validation)

    if (errors.length > 0) {
      extensions = {
        ...extensions,
        message: errors.map((err) => err.messages.join(' | ')).join(' | ')
      }
    }
  }

  logErrorDebugMsg(new Logger('GraphQLErrorParser'), extensions, exception?.extensions?.exception?.stacktrace?.join(EOL))

  return new GraphQLPreformattedException({
    message: getErrorMessage(exception),
    path: exception.path,
    extensions
  })
}
