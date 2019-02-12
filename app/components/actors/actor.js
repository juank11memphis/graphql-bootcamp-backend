import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ActorSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    collection: 'actors',
  },
)

export default mongoose.model('Actor', ActorSchema)
