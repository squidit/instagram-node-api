require('should')
const buildOptionsForMedias = require('../src/shared-functions/build-options-for-medias')

describe('build options for medias', () => {
  it('should return options with json:true', (done) => {
    let nextUrl = 'unitTest'
    let defaultOptions = {
      json: true
    }
    let accessToken = 'unit test token'

    function assert (options) {
      options.should.have.property('json')
      options.json.should.be.eql(true)
      done()
    }

    assert(buildOptionsForMedias(nextUrl, defaultOptions, accessToken))
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
      options.query.should.have.property('count')
      options.query.access_token.should.be.eql('unit test token')
      options.query.count.should.be.eql(33)
      options.json.should.be.eql(true)
      done()
    }

    assert(buildOptionsForMedias(undefined, defaultOptions, accessToken))
  })
})
