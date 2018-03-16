function buildOptionsForMedias (nextUrl, defaultOptions, accessToken, count = 33) {
  if (!count || count <= 0 || count > 33) {
    count = 33
  }

  return nextUrl ? defaultOptions : Object.assign({}, defaultOptions, {
    query: {
      access_token: accessToken,
      count
    }
  })
}

module.exports = buildOptionsForMedias
