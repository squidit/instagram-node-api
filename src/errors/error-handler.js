const InstagramError = require('./InstagramError')
const InstagramErrorMaxRequests = require('./InstagramErrorMaxRequests')
const get = require('lodash/get')

function errorHandler (error, instagramNodeApi) {
  let err = get(error, 'response.body')
  if (err.code === 429) {
    instagramNodeApi.emit('err', new InstagramErrorMaxRequests(err))
  } else {
    instagramNodeApi.emit('err', new InstagramError(err))
  }
}

module.exports = errorHandler
