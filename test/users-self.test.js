require('should')
const userSelfMock = require('./mock/users-self.mock')
const mockMaxReqExceeded = require('./mock/request-instagram-access-token-max-request-exceed')
const InstagramNodeApi = require('../')
const InstagramErrorMaxRequests = require('../src/errors/InstagramErrorMaxRequests')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN,
  TEST_INSTAGRAM_ACCESS_TOKEN_WITHOUT_REQUESTS
} = process.env

describe('users self', () => {
  userSelfMock();
  mockMaxReqExceeded();

  it('should return information about the owner of the access token.', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.usersSelf()

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
    instagramNodeApi.usersSelf()

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
    instagramNodeApi.usersSelf()

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
    instagramNodeApi.usersSelf()

    instagramNodeApi.on('finish', (data, meta, remaining, limit) => {
      try {
        limit.should.be.eql(5000)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should return a exception InstagramErrorMaxRequests', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN_WITHOUT_REQUESTS)
    instagramNodeApi.usersSelf();

    instagramNodeApi.on('err', (error) => {
      error.name.should.be.eql('InstagramErrorMaxRequests');
      error.statusCode.should.be.eql(429);
      error.should.be.an.instanceof(InstagramErrorMaxRequests)
      error.type.should.be.eql('OAuthRateLimitException')
      done()
    })
  })
})
