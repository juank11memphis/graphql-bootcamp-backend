import { MoviesService, ActorsService } from '../components'

export default {
  Movie: {
    cast: movie => {
      return ActorsService.findByIds(movie.cast)
    },
  },
  Query: {
    getApiVersion: () => require('../../package.json').version,
    getAllMovies: () => {
      return MoviesService.getAllMovies()
    },
  },
}
