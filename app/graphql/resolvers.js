import { AuthenticationError, withFilter } from 'apollo-server-express'

import { MoviesService, ActorsService } from '../components'

const MOVIE_ADDED_SUBSCRIPTION = 'MOVIE_ADDED'
const MOVIE_UPDATED_SUBSCRIPTION = 'MOVIE_UPDATED'

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
    updateMovie: async (root, args, context) => {
      const { movieId, data } = args
      const { token, pubsub } = context
      if (!token) {
        throw new AuthenticationError('Unauthorized')
      }
      const movieUpdated = await MoviesService.updateMovie(movieId, data)
      pubsub.publish(MOVIE_UPDATED_SUBSCRIPTION, { movieUpdated })
      return movieUpdated
    },
  },
  Subscription: {
    movieAdded: {
      subscribe: (root, args, context) => {
        const { pubsub, currentUser } = context
        console.log('---------------------movieAdded subscription added')
        console.log(currentUser)
        return pubsub.asyncIterator([MOVIE_ADDED_SUBSCRIPTION])
      },
    },
    movieUpdated: {
      subscribe: withFilter(
        (root, args, context) => {
          const { pubsub } = context
          return pubsub.asyncIterator([MOVIE_UPDATED_SUBSCRIPTION])
        },
        (payload, variables) =>
          payload.movieUpdated._id.toString() === variables.id,
      ),
    },
  },
}
