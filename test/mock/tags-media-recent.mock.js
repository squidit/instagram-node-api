const nock = require('nock')

const {
  INSTAGRAM_API_PROTOCOL: instagramApiProtocol,
  INSTAGRAM_API_HOST: instagramApiHost,
  INSTAGRAM_API_VERSION: instagramApiVersion
} = require('../../src/constants')

const { TEST_INSTAGRAM_ACCESS_TOKEN } = process.env

const baseUrl = `${instagramApiProtocol}://${instagramApiHost}/${instagramApiVersion}`

module.exports = function tagsMediaRecentMock () {
  beforeEach((done) => {
    nock(baseUrl)
      .get('/tags/teste/media/recent')
      .query({
        access_token: TEST_INSTAGRAM_ACCESS_TOKEN,
        count: '33'
      })
      .reply(200, {
        pagination: {
          next_url: `https://api.instagram.com/v1/tags/teste/media/recent?access_token=${TEST_INSTAGRAM_ACCESS_TOKEN}&count=33&max_id=1193500324263228984_30990380`,
          next_max_id: '1193500324263228984_30990380'
        },
        meta: {
          code: 200
        },
        data: Array.from(Array(33).keys()).map((item) => {
          const initialDate = new Date('Tue Nov 22 2016 22:00:00 GMT-0200 (BRST)')
          const datetime = (Date.parse(initialDate) - (item * 86400000)) / 1000
          return { created_time: datetime.toString() }
        })
      }, {
        'x-ratelimit-limit': '5000',
        'x-ratelimit-remaining': '4990'
      })
      .get('/tags/teste/media/recent')
      .query({
        access_token: TEST_INSTAGRAM_ACCESS_TOKEN,
        count: '33',
        max_id: '1193500324263228984_30990380'
      })
      .reply(200, {
        pagination: {
        },
        meta: {
          code: 200
        },
        data: Array.from(Array(7).keys()).map((item) => {
          const initialDate = new Date('Thu Oct 20 2016 22:00:00 GMT-0200 (BRST)')
          const datetime = (Date.parse(initialDate) - (item * 86400000)) / 1000
          return { created_time: datetime.toString() }
        })
      }, {
        'x-ratelimit-limit': '5000',
        'x-ratelimit-remaining': '4989'
      })
    done()
  })
}
