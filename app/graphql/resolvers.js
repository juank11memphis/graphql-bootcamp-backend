import { MoviesService, ActorsService } from '../components'

export default {
  Movie: {
    cast: (movie, args, context) => {
      const { actorsDataLoader } = context
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
    createMovie: (root, args) => {
      const { movie } = args
      return MoviesService.createMovie(movie)
    },
  },
}
