function buildOptionsForUnlikeMedia (defaultOptions, accessToken) {
  return Object.assign({}, defaultOptions, {
    query: {
      access_token: accessToken
    }
  })
}

module.exports = buildOptionsForUnlikeMedia
