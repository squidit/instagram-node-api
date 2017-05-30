require('should')
const InstagramNodeApi = require('../')
const mock = require('./mock/get-media.mock')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN,
  UID_MEDIA_TEST
} = process.env

describe('get media', () => {
  mock()

  it('should return user_has_liked property', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.getMedia(UID_MEDIA_TEST)

    instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit) => {
      data.should.have.property('user_has_liked')
      done()
    })

    instagramNodeApi.on('err', (err) => done(err))
  })
  it('should return remining with 4989', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.getMedia(UID_MEDIA_TEST)

    instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit) => {
      remaining.should.be.eql(4989)
      done()
    })

    instagramNodeApi.on('err', (err) => done(err))
  })
})
