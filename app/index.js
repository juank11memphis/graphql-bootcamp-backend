const start = () => {
  try {
    // Initialize Database
    require('./core/database')
  } catch (error) {
    console.log('Unexpected error initializing database...', error)
  }
  try {
    // Initialize Server
    require('./core/server')
  } catch (error) {
    console.log('Unexpected error initializing server...', error)
  }
}

start()
