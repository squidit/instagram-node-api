const nock = require('nock')

const {
  INSTAGRAM_API_PROTOCOL: instagramApiProtocol,
  INSTAGRAM_API_HOST: instagramApiHost,
  INSTAGRAM_API_VERSION: instagramApiVersion
} = require('../../src/constants')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN_WITHOUT_REQUESTS
} = process.env

const baseUrl = `${instagramApiProtocol}://${instagramApiHost}/${instagramApiVersion}`

function MockRequestAccessTokenMaxReqExceeded () {
  beforeEach((done) => {
    nock(baseUrl)
      .get('/users/self')
      .query({
        access_token: TEST_INSTAGRAM_ACCESS_TOKEN_WITHOUT_REQUESTS
      })
      .reply(429, {
        code: 429,
        error_type: 'OAuthRateLimitException',
        error_message: 'You have exceeded the maximum number of requests per hour. You have performed a total of 5042 requests in the last hour. Our general maximum request limit is set at 5000 requests per hour.'
      })
    done()
  })
}

module.exports = MockRequestAccessTokenMaxReqExceeded
