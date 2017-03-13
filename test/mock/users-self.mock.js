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

function usersSelfMock () {
  beforeEach((done) => {
    nock(baseUrl)
      .get('/users/self')
      .query({
        access_token: TEST_INSTAGRAM_ACCESS_TOKEN
      })
      .reply(200, {
        meta: {
          code: 200
        },
        data: {
          username: 'limafelipe92',
          bio: 'dissolvere et recompose',
          website: 'http://twitter.com/limafelipe92',
          profile_picture: 'https://scontent.cdninstagram.com/t51.2885-19/s150x150/13549571_1598681493795583_1046826605_a.jpg',
          full_name: 'Felipe Lima',
          counts: {
            media: 274,
            followed_by: 495,
            follows: 146
          },
          id: '30990380'
        }
      }, {
        'x-ratelimit-limit': '5000',
        'x-ratelimit-remaining': '4989'
      })
    done()
  })
}
module.exports = usersSelfMock
