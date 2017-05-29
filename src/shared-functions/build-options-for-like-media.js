function buildOptionsForLikeMedia (accessToken) {
  return {
    body: {
      access_token: accessToken
    }
  }
}

module.exports = buildOptionsForLikeMedia
