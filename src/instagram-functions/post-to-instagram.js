const parseResponse = require('../parse-response')
const got = require('got')

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
    .catch((err) => {
      if (callCount <= require('../constants').MAX_RETRY_COUNT) postToInstagram(url, options, callCount + 1)
      throw err
    })
}

module.exports = postToInstagram
