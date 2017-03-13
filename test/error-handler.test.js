require('should')
const InstagramNodeApi = require('../src/InstagramNodeApi')
const InstagramError = require('../src/errors/InstagramError')
const InstagramErrorMaxRequests = require('../src/errors/InstagramErrorMaxRequests')
const errorHandler = require('../src/errors/error-handler')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

describe('error handler', () => {
  it('should return an InstagramError error', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    let error = {
      response: {
        body: {
          code: 429,
          error_message: 'unit test message',
          error_type: 'UnitTestException'
        }
      }
    }

    instagramNodeApi.on('err', (err) => {
      try {
        err.response.body.statusCode.should.be.eql(429)
        err.type.should.be.eql('UnitTestException')
        done()
      } catch (ex) {
        done(ex)
      }
    })

    errorHandler(error, instagramNodeApi)
  })

  it('should return an InstagramErrorMaxRequests error', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    let error = {
      response: {
        body: {
          meta: {
            code: 200,
            error_message: 'unit test message',
            error_type: 'UnitTestException'
          }
        }
      }
    }

    instagramNodeApi.on('err', (err) => {
      try {
        err.statusCode.should.be.eql(200)
        err.type.should.be.eql('UnitTestException')
        done()
      } catch (error) {
        done(error)
      }
    })

    errorHandler(error, instagramNodeApi)
  })
})
