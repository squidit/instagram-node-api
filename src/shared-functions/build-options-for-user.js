function buildOptionsForUser (defaultOptions, accessToken, queryOptions) {
  return Object.assign({}, defaultOptions, {
    query: Object.assign({
      access_token: accessToken
    }, queryOptions)
  })
}

module.exports = buildOptionsForUser
