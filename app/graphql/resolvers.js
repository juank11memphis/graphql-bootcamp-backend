import { MoviesService } from '../components'

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
  },
}
