require('should')
const mock = require('./mock/instagram-exception.mock')
const InstagramNodeApi = require('../')

const { TEST_INSTAGRAM_ACCESS_TOKEN } = process.env

describe('instagram exception', () => {
  mock()

  it('should throw err event when instagram returns an error', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.usersSelf()

    instagramNodeApi.on('err', () => {
      done()
    })

    instagramNodeApi.on('finish', () => {
      done(new Error('finish'))
    })
  })

  it('should wrap InstagramError error', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.usersSelf()

    instagramNodeApi.on('err', (error) => {
      console.log(error)
      error.statusCode.should.be.eql(400)
      error.statusMessage.should.be.eql('Bad Request')
      done()
    })

    instagramNodeApi.on('finish', () => {
      done(new Error('finish'))
    })
  })
})
