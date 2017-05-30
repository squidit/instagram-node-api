function emitLikedMedias ([data, pagination, meta, remaining, limit], instagramNodeApi) {
  console.log(data, pagination, meta, remaining, limit)
  instagramNodeApi.emit('finish', data, pagination, meta, remaining, limit)
}

module.exports = emitLikedMedias
