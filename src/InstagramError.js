class InstagramError extends Error {
  constructor (error) {
    super(error.meta.error_message)
    this.type = error.meta.error_type
    this.statusCode = error.meta.code
    this.name = 'InstagramError'
  }
}

module.exports = InstagramError
