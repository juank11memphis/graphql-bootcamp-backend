export default {
  Query: {
    getApiVersion: () => require('../../package.json').version,
  },
}
