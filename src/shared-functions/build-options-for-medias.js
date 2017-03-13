function buildOptionsForMedias (nextUrl, defaultOptions, accessToken) {
  return nextUrl ? defaultOptions : Object.assign({}, defaultOptions, {
    query: {
      access_token: accessToken,
      count: 33
    }
  })
}

module.exports = buildOptionsForMedias
