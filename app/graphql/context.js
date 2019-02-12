import DataLoader from 'dataloader'

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

const getContext = () => {
  return {
    actorsDataLoader: getActorsDataLoader(),
  }
}

export default getContext
