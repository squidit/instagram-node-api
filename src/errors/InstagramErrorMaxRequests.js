class InstagramErrorMaxRequests extends Error {
  constructor (error) {
    super(error.error_message)
    this.type = error.error_type
    this.statusCode = error.code
    this.name = 'InstagramErrorMaxRequests'
  }
}

module.exports = InstagramErrorMaxRequests
