require('should')
const InstagramNodeApi = require('../src/InstagramNodeApi')
const InstagramError = require('../src/errors/InstagramError')
const InstagramErrorMaxRequests = require('../src/errors/InstagramErrorMaxRequests')
const errorHandler = require('../src/errors/error-handler')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

describe('error handler', () => {
  it('should wrap InstagramError error', (done) => {
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
        err.response.body.meta.code.should.be.eql(200)
        err.response.body.meta.error_type.should.be.eql('UnitTestException')
        done()
      } catch (error) {
        done(error)
      }
    })

    errorHandler(error, instagramNodeApi)
  })
})
