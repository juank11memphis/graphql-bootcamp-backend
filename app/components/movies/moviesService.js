import Movie from './movie'
import '../actors/actor'

class MoviesService {
  async getAllMovies() {
    const movies = await Movie.find({}).populate('cast')
    console.log('---------------------movies')
    console.log(movies)
    return movies
  }
}

export default new MoviesService()
