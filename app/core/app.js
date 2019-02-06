import express, { Router } from 'express'
import bodyParser from 'body-parser'

const app = express()

const routes = new Router()
routes.get('/api', (req, res, next) =>
  res.status(200).json({ api_version: '1.0.0' }),
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes)

export default app
