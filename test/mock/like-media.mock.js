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

module.exports = function likeMediaMock () {
  beforeEach((done) => {
    nock(baseUrl)
      .post('/media/1482874536541873956_1645525258/likes',{
        access_token: TEST_INSTAGRAM_ACCESS_TOKEN
      })
      .reply(200, {
        meta: {
          code: 200
        },
        data: null
      }, {
        'x-ratelimit-limit': '5000',
        'x-ratelimit-remaining': '4989'
      })
    done()
  })
}
