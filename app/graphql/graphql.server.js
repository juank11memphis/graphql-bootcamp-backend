import { ApolloServer, AuthenticationError } from 'apollo-server-express'

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
  subscriptions: {
    onConnect: async connectionParams => {
      console.log('Connected to websocket')
      const { authorization } = connectionParams
      if (authorization) {
        // validate token
        // find token user
        return {
          currentUser: { id: 11, name: 'Juan Carlos' },
        }
      }
      throw new AuthenticationError('Missing auth token!')
    },
  },
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
