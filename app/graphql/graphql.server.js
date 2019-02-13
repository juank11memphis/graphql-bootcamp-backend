import { ApolloServer } from 'apollo-server-express'

import schema from './schema'
import context from './context'

const INTERNAL_ERROR_CODE = 500

const GRAPH_CODE_TO_HTTP_CODE = {
  UNAUTHENTICATED: 401,
}

const isProd = false

const graphServer = new ApolloServer({
  schema,
  context,
  formatError: error => {
    const { message, extensions = {} } = error
    const { code, exception } = extensions
    const { stacktrace } = exception
    const httpStatusCode = GRAPH_CODE_TO_HTTP_CODE[code] || INTERNAL_ERROR_CODE
    console.log('---------------------graphql error')
    console.log(stacktrace)
    return {
      message,
      errorCode: code,
      httpStatusCode,
      stacktrace: isProd ? null : stacktrace,
    }
  },
})

export default graphServer
