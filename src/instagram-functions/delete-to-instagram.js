const parseResponse = require('../parse-response')
const got = require('got')

function deleteToInstagram (url, options, callCount = 0) {
  return got.delete(url, options)
    .then(parseResponse)
    .catch((err) => {
      if (callCount <= require('../constants').MAX_RETRY_COUNT) deleteToInstagram(url, options, callCount + 1)
      throw err
    })
}

module.exports = deleteToInstagram
