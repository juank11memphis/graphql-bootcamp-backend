import app from './app'
import graphServer from '../graphql/graphql.server'

graphServer.applyMiddleware({ app })

const port = 3001
const environment = process.env.NODE_ENV

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Server started successfully
    Port: ${port}
    Env: ${environment}
  `)
})

export default server
