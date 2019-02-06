// Used as entry for local server only
process.env.NODE_ENV = process.env.NODE_ENV || 'local'

require('@babel/register')
require('./app')
