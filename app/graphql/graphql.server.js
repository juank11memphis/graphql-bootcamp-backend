import { ApolloServer } from 'apollo-server-express'

import schema from './schema'

const graphServer = new ApolloServer({ schema })

export default graphServer
