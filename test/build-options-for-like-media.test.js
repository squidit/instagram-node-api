require('should')
const buildOptionsForLikeMedia = require('../src/shared-functions/build-options-for-like-media')

describe('build options for like media', () => {
  it('should return options with an object', (done) => {
    let accessToken = 'unit test token'

    function assert (options) {
      options.should.have.property('body')
      options.body.should.have.property('access_token')
      options.body.access_token.should.be.eql('unit test token')
      done()
    }

    assert(buildOptionsForLikeMedia(accessToken))
  })
})
