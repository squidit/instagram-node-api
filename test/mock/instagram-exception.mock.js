const nock = require('nock')

const {
  INSTAGRAM_API_PROTOCOL: instagramApiProtocol,
  INSTAGRAM_API_HOST: instagramApiHost,
  INSTAGRAM_API_VERSION: instagramApiVersion
} = require('../../src/constants')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

const baseUrl = `${instagramApiProtocol}://${instagramApiHost}/${instagramApiVersion}`

module.exports = function usersSelfMock () {
  beforeEach((done) => {
    nock(baseUrl)
      .get('/users/self')
      .query({
        access_token: TEST_INSTAGRAM_ACCESS_TOKEN
      })
      .reply(400, {
        meta: {
          error_message: 'The access_token provided is invalid.',
          error_type: 'OAuthAccessTokenException',
          code: 400
        }
      })
    done()
  })
}
