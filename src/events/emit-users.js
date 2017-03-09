function emitUsers ([data, , meta, remaining, limit], instagramNodeApi) {
  instagramNodeApi.emit('data', data, meta, remaining, limit)
  instagramNodeApi.emit('finish', data, meta, remaining, limit)
}

module.exports = emitUsers
