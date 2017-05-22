
function buildOptionsForUpvote (defaultOptions, accessToken) {
  return defaultOptions : Object.assign({}, defaultOptions, {
    query: {
      access_token: accessToken,
      count: 33
    }
  })
}

module.exports = buildOptionsForMedias
