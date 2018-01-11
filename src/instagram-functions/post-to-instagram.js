const parseResponse = require('../parse-response')
const got = require('got')
const httpRetry = require('../errors/http-retry-handler')

function parseBodyToJsonObject (response) {
  try {
    response.body = JSON.parse(response.body)
    return response
  } catch (e) {
    return response
  }
}

function postToInstagram (url, options, callCount = 0) {
  return got.post(url, options)
    .then(parseBodyToJsonObject)
    .then(parseResponse)
    .catch((err) => httpRetry(err, postToInstagram, callCount, url, options))
}

module.exports = postToInstagram
