const parseResponse = require('../parse-response')
const got = require('got')

function parseBodyToJsonObject(response){
  try{
    response.body = JSON.parse(response.body)
    return response
  }
  catch(e){
    return response
  }
}

function postToInstagram (url, options) {
  return got.post(url, options)
    .then(parseBodyToJsonObject)
    .then(parseResponse)
}

module.exports = postToInstagram
