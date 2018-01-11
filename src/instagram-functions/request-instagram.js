const got = require('got')
const parseResponse = require('../parse-response')

function requestInstagram (url, options, callCount = 0) {
  return got(url, options)
    .then(parseResponse)
    .catch((err) => {
      if (callCount <= require('../constants').MAX_RETRY_COUNT) requestInstagram(url, options, callCount + 1)
      throw err
    })
}

module.exports = requestInstagram
