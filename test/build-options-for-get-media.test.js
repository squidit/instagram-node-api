require('should')
const buildOptionsForGetMedia = require('../src/shared-functions/build-options-for-get-media')

describe('build options for get media', () => {
  it('should return options with json:true', (done) => {
    let defaultOptions = {
      json: true
    }
    let accessToken = 'unit test token'

    function assert (options) {
      options.should.have.property('json')
      options.json.should.be.eql(true)
      done()
    }

    assert(buildOptionsForGetMedia(defaultOptions, accessToken))
  })

  it('should return options with json and query', (done) => {
    let defaultOptions = {
      json: true
    }
    let accessToken = 'unit test token'

    function assert (options) {
      options.should.have.property('json')
      options.should.have.property('query')
      options.query.should.have.property('access_token')
      options.query.access_token.should.be.eql('unit test token')
      options.json.should.be.eql(true)
      done()
    }

    assert(buildOptionsForGetMedia(defaultOptions, accessToken))
  })
})
