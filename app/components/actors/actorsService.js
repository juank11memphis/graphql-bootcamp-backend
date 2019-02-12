import Actor from './actor'

class ActorsService {
  findByIds(ids) {
    console.log('---------------------ActorsService findByIds')
    console.log(ids)
    return Actor.find({ _id: { $in: ids } })
  }

  getAllActors() {
    return Actor.find({})
  }
}

export default new ActorsService()
