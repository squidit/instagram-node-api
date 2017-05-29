function emitLikedMedias ([data, pagination, meta, remaining, limit], instagramNodeApi) {
  instagramNodeApi.emit('finish', data, pagination, meta, remaining, limit)
}

module.exports = emitLikedMedias
