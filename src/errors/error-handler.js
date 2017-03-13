function errorHandler (error, instagramNodeApi) {
  instagramNodeApi.emit('err', error)
}

module.exports = errorHandler
