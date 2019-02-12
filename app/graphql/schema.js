import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const typeDefs = `
  type Actor {
    id: String!
    name: String
  }

  type Movie {
    id: String!
    genres: [String]
    title: String
    originalTitle: String
    posterPath: String
    overview: String
    releaseDate: String
    cast: [Actor]
  }

  type Query {
    getApiVersion: String
    getAllMovies: [Movie]
  }
`

const getSchema = () =>
  makeExecutableSchema({
    typeDefs,
    resolvers,
  })

const schema = getSchema()

export default schema
