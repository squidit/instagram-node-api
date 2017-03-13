class InstagramError extends Error {
  constructor (error) {
    if (error.hasOwnProperty('meta')) {
      super(error.meta.error_message)
      this.type = error.meta.error_type
      this.statusCode = error.meta.code
    } else {
      super(error.error_message)
      this.type = error.error_type
      this.statusCode = error.code
    }
    this.name = 'InstagramError'
  }
}

module.exports = InstagramError
