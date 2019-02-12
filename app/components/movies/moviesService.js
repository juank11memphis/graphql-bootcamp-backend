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

  createMovie(movie) {
    const newMovie = new Movie(movie)
    return newMovie.save()
  }
}

export default new MoviesService()
