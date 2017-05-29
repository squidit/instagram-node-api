require('should')
const InstagramNodeApi = require('../')
const errorHandler = require('../src/errors/error-handler')
const mock = require('./mock/like-media.mock')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN,
  UID_MEDIA_TEST
} = process.env

describe('like media', () => {
  mock()

  it('should return meta propery with code 200', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.likeMedia(UID_MEDIA_TEST)

    instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit) => {
      meta.code.should.be.eql(200)
      done()
    })

    instagramNodeApi.on('err', (err) => done(err))
  })
  it('should return remining with 4989', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.likeMedia(UID_MEDIA_TEST)

    instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit) => {
      remaining.should.be.eql(4989)
      done()
    })

    instagramNodeApi.on('err', (err) => done(err))
  })
})
