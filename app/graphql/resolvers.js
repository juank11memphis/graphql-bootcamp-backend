import { AuthenticationError } from 'apollo-server-express'

import { MoviesService, ActorsService } from '../components'

const MOVIE_ADDED_SUBSCRIPTION = 'MOVIE_ADDED'

export default {
  Movie: {
    cast: (movie, args, context) => {
      const { actorsDataLoader, token } = context
      if (!token) {
        return []
      }
      return actorsDataLoader.loadMany(movie.cast)
    },
  },
  Query: {
    getApiVersion: () => require('../../package.json').version,
    getAllMovies: () => {
      return MoviesService.getAllMovies()
    },
    getMovieById: (root, args) => {
      const { movieId } = args
      return MoviesService.getMovieById(movieId)
    },
    getAllActors: () => {
      return ActorsService.getAllActors()
    },
  },
  Mutation: {
    createMovie: async (root, args, context) => {
      const { movie } = args
      const { token, pubsub } = context
      if (!token) {
        throw new AuthenticationError('Unauthorized')
      }
      const newMovie = await MoviesService.createMovie(movie)
      pubsub.publish(MOVIE_ADDED_SUBSCRIPTION, { movieAdded: newMovie })
      return newMovie
    },
  },
  Subscription: {
    movieAdded: {
      subscribe: (root, args, context) => {
        const { pubsub } = context
        return pubsub.asyncIterator([MOVIE_ADDED_SUBSCRIPTION])
      },
    },
  },
}
