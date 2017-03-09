const InstagramError = require('./InstagramError')
const InstagramErrorMaxRequests = require('./InstagramErrorMaxRequests')
const get = require('lodash/get')

function errorHandler (error, instagramNodeApi) {
  let err = get(error, 'response.body')
  if (err.code === 429) {
    instagramNodeApi.emit('err', new InstagramErrorMaxRequests(get(error, 'response.body')))
  } else {
    instagramNodeApi.emit('err', new InstagramError(get(error, 'response.body')))
  }
}

module.exports = errorHandler
