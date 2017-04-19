const get = require('lodash/get')
class InstagramErrorMaxRequests extends Error {
  constructor (error) {
    super(get(error, 'error_message', 'Error max requests on instagram'))
    this.type = error.error_type
    this.statusCode = error.code
    this.name = 'InstagramErrorMaxRequests'
  }
}

module.exports = InstagramErrorMaxRequests
