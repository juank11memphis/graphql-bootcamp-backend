import Movie from './movie'
import '../actors/actor'

class MoviesService {
  async getAllMovies() {
    const movies = await Movie.find({})
    return movies
  }

  getMovieById(movieId) {
    return Movie.findById(movieId)
  }
}

export default new MoviesService()
