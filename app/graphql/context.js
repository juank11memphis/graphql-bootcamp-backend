import DataLoader from 'dataloader'
import { PubSub } from 'apollo-server-express'
import { get } from 'lodash'

const pubsub = new PubSub()

import { ActorsService } from '../components'

const getActorsDataLoader = () => {
  return new DataLoader(async ids => {
    const actors = await ActorsService.findByIds(ids)
    console.log('---------------------ids.length')
    console.log(ids.length)
    console.log('---------------------actors.length')
    console.log(actors.length)
    const finalList = ids.map(id =>
      actors.find(actor => actor._id.toString() === id.toString()),
    )
    console.log('---------------------finalList.length')
    console.log(finalList.length)
    return finalList
  })
}

const getContext = contextData => {
  const { req } = contextData
  const authorization = get(req, 'headers.authorization')
  return {
    token: authorization,
    actorsDataLoader: getActorsDataLoader(),
    pubsub,
  }
}

export default getContext
