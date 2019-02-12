import Movie from './movie'

class MoviesService {
  getAllMovies() {
    return Movie.find({})
  }
}

export default new MoviesService()
