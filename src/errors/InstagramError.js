const get = require('lodash/get')
class InstagramError extends Error {
  constructor (error) {
    if (error.hasOwnProperty('meta')) {
      super(get(error.meta, 'error_message', 'Error searching instagram'))
      this.type = error.meta.error_type
      this.statusCode = error.meta.code
    } else {
      super(get(error, 'error_message', 'Error searching instagram'))
      this.type = error.error_type
      this.statusCode = error.code
    }
    this.name = 'InstagramError'
  }
}

module.exports = InstagramError
