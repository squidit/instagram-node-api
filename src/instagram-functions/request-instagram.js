const got = require('got')
const parseResponse = require('../parse-response')

function requestInstagram (url, options) {
  return got(url, options)
    .then(parseResponse)
}

module.exports = requestInstagram
