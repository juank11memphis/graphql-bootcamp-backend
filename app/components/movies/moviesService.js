import Movie from './movie'
import '../actors/actor'

class MoviesService {
  async getAllMovies() {
    const movies = await Movie.find({})
    return movies
  }
}

export default new MoviesService()
