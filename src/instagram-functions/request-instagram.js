const got = require('got')
const parseResponse = require('../parse-response')
const httpRetry = require('../errors/http-retry-handler')

function requestInstagram (url, options, callCount = 0) {
  return got(url, options)
    .then(parseResponse)
    .catch((err) => httpRetry(err, requestInstagram, callCount, url, options))
}

module.exports = requestInstagram
