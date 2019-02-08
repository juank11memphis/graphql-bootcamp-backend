import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  type Query {
    getApiVersion: String
  }
`

const getSchema = () =>
  makeExecutableSchema({
    typeDefs,
  })

const schema = getSchema()

export default schema
