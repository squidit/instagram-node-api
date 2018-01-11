const parseResponse = require('../parse-response')
const got = require('got')
const httpRetry = require('../errors/http-retry-handler')

function deleteToInstagram (url, options, callCount = 0) {
  return got.delete(url, options)
    .then(parseResponse)
    .catch((err) => httpRetry(err, deleteToInstagram, callCount, url, options))
}

module.exports = deleteToInstagram
