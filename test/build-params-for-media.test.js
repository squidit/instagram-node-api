const should = require('should')
const buildParamsForMedia = require('../src/shared-functions/build-params-for-media')

describe('build params for media', () => {
  it('should return date limit and limit = 0 if pass only date', (done) => {
    const date = new Date('2017-10-10')

    const {dateLimit, limit} = buildParamsForMedia(date)

    dateLimit.should.be.eql(date)
    limit.should.be.eql(0)
    done()
  })

  it('should return date limit null and limit if pass only limit', (done) => {
    const {dateLimit, limit} = buildParamsForMedia(100)

    should.equal(dateLimit, null)
    limit.should.be.eql(100)
    done()
  })

  it('should return date limit and limit if pass both', (done) => {
    const date = new Date('2017-10-10')

    const {dateLimit, limit} = buildParamsForMedia(date, 100)

    dateLimit.should.be.eql(date)
    limit.should.be.eql(100)
    done()
  })
})
