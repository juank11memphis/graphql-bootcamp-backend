import mongoose from 'mongoose'

// Use native promises
mongoose.Promise = global.Promise

// Connect to our mongo database;
mongoose.connect('mongodb://mongodb:27017/movies', {
  socketTimeoutMS: 10000,
  useNewUrlParser: true,
})
mongoose.connection
  // eslint-disable-next-line no-console
  .once('open', () => console.log('Successfully connected to MongDB!'))
  .on('error', err => {
    throw err
  })
