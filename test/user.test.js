require('should')
const mock = require('./mock/user.mock')
const mockMaxReqExceeded = require('./mock/request-instagram-access-token-max-request-exceed')
const InstagramNodeApi = require('../')
const errorHandler = require('../src/errors/error-handler')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

describe('user information', () => {
  mock()
  mockMaxReqExceeded()

  it('should return information about the user id.', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.user('30990380')

    instagramNodeApi.on('finish', (profile) => {
      try {
        profile.id.should.be.eql('30990380')
        profile.username.should.be.eql('limafelipe92')
        profile.full_name.should.be.eql('Felipe Lima')
        profile.website.should.be.eql('http://twitter.com/limafelipe92')
        profile.full_name.should.be.eql('Felipe Lima')
        profile.profile_picture.should.be.eql('https://scontent.cdninstagram.com/t51.2885-19/s150x150/13549571_1598681493795583_1046826605_a.jpg')
        profile.counts.media.should.be.eql(274)
        profile.counts.followed_by.should.be.eql(495)
        profile.counts.follows.should.be.eql(146)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should return meta object.', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.user('30990380')

    instagramNodeApi.on('finish', (profile, meta) => {
      try {
        meta.code.should.be.eql(200)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should return remaining value.', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.user('30990380')

    instagramNodeApi.on('finish', (data, meta, remaining) => {
      try {
        remaining.should.be.eql(4989)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should return limit value.', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.user('30990380')

    instagramNodeApi.on('finish', (data, meta, remaining, limit) => {
      try {
        limit.should.be.eql(5000)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

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
