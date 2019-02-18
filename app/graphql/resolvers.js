import { AuthenticationError } from 'apollo-server-express'

import { MoviesService, ActorsService } from '../components'

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
    createMovie: (root, args, context) => {
      const { movie } = args
      const { token } = context
      if (!token) {
        throw new AuthenticationError('Unauthorized')
      }
      return MoviesService.createMovie(movie)
    },
  },
}
