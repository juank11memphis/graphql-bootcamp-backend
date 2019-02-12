import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MovieSchema = new Schema(
  {
    genres: Array,
    title: String,
    originalTitle: String,
    posterPath: String,
    overview: String,
    releaseDate: String,
    cast: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Actor',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'movies',
  },
)

export default mongoose.model('Movie', MovieSchema)
