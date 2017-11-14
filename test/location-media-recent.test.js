require('should')
const InstagramNodeApi = require('../')
const errorHandler = require('../src/errors/error-handler')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

describe('locations media recent', () => {
  it('should return a error when locationId is not defined', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    try {
      instagramNodeApi.locationMediasRecent()
      done(new Error('passed'))
    } catch (err) {
      err.message.should.be.eql('Invalid locationId')
      done()
    }
  })

  it('should return a error when locationId is not number', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    try {
      instagramNodeApi.locationMediasRecent('teste')
      done(new Error('passed'))
    } catch (err) {
      err.message.should.be.eql('Invalid locationId')
      done()
    }
  })
})
