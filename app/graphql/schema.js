import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const typeDefs = `
  type Query {
    getApiVersion: String
  }
`

const getSchema = () =>
  makeExecutableSchema({
    typeDefs,
    resolvers,
  })

const schema = getSchema()

export default schema
