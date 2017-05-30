const parseResponse = require('../parse-response')
const got = require('got')

function deleteToInstagram (url, options) {
  return got.delete(url, options)
    .then(parseResponse)
}

module.exports = deleteToInstagram
