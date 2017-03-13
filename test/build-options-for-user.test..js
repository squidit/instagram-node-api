require('should')
const buildOptionsForUser = require('../src/shared-functions/build-options-for-user')

describe('build options for user', () => {
  it('should return options with json:true and query', (done) => {
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

    assert(buildOptionsForUser(defaultOptions, accessToken))
  })
})
