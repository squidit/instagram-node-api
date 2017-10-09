require('should')
const emitUser = require('../src/events/emit-users')
const InstagramNodeApi = require('../src/InstagramNodeApi')
const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

describe('emit user unit test', () => {
  it('should emit event data and finish', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    const data = {
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
    const meta = {
      code: 200
    }
    const remaining = 2000
    const limit = 1000
    const params = [data, null, meta, remaining, limit]

    instagramNodeApi.on('data', (data, meta, remaining, limit) => {
      meta.code.should.be.eql(200)
      remaining.should.be.eql(2000)
      limit.should.be.eql(1000)
      data.should.have.property('username')
      data.should.have.property('bio')
      data.should.have.property('website')
      data.should.have.property('profile_picture')
      data.should.have.property('full_name')
      data.should.have.property('counts')
      data.counts.should.have.property('media')
      data.counts.should.have.property('followed_by')
      data.counts.should.have.property('follows')
      data.should.have.property('id')
    })

    instagramNodeApi.on('finish', (data, meta, remaining, limit) => {
      data.should.have.property('username')
      data.should.have.property('bio')
      data.should.have.property('website')
      data.should.have.property('profile_picture')
      data.should.have.property('full_name')
      data.should.have.property('full_name')
      data.should.have.property('counts')
      data.should.have.property('counts')
      data.counts.should.have.property('media')
      data.counts.should.have.property('followed_by')
      data.counts.should.have.property('follows')
      data.should.have.property('id')
      meta.should.have.property('code')
      meta.code.should.be.eql(200)
      remaining.should.be.eql(2000)
      limit.should.be.eql(1000)
      done()
    })

    emitUser(params, instagramNodeApi)
  })
})
