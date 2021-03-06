require('should')
const mock = require('./mock/users-self-media-recent.mock')
const mockMaxReqExceeded = require('./mock/request-instagram-access-token-max-request-exceed')
const InstagramNodeApi = require('../')
const errorHandler = require('../src/errors/error-handler')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

describe('users self media recent', () => {
  mock()
  mockMaxReqExceeded()

  it('should return meta object with success', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    const metas = []
    instagramNodeApi.usersSelfMediaRecent()

    instagramNodeApi.on('data', (data, pagination, meta) => {
      metas.push(meta)
    })

    instagramNodeApi.on('finish', () => {
      try {
        metas.should.have.length(2)
        metas[0].should.have.property('code', 200)
        metas[1].should.have.property('code', 200)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should return remaining object with success', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    const remainings = []
    instagramNodeApi.usersSelfMediaRecent()

    instagramNodeApi.on('data', (data, pagination, meta, remaining) => {
      remainings.push(remaining)
    })

    instagramNodeApi.on('finish', (data, pagination, meta, remaining) => {
      try {
        remainings.should.have.length(2)
        remaining.should.be.eql(4989)
        remainings[0].should.be.eql(4990)
        remainings[1].should.be.eql(4989)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should return limit object with success', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    const limits = []
    instagramNodeApi.usersSelfMediaRecent()

    instagramNodeApi.on('data', (data, pagination, meta, remaining, limit) => {
      limits.push(limit)
    })

    instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit) => {
      try {
        limit.should.be.eql(5000)
        limits.should.have.length(2)
        limits[0].should.be.eql(5000)
        limits[1].should.be.eql(5000)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should return result object with success', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.usersSelfMediaRecent()

    instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit, result) => {
      try {
        result.should.have.property('totalCalls', 2)
        result.should.have.property('totalMedias', 40)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should return all medias with success', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    const medias = []
    instagramNodeApi.usersSelfMediaRecent()

    instagramNodeApi.on('data', (data) => {
      data.map(media => medias.push(media))
    })

    instagramNodeApi.on('finish', () => {
      try {
        medias.should.have.length(40)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should return pagination object with success', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    const paginations = []
    instagramNodeApi.usersSelfMediaRecent()

    instagramNodeApi.on('data', (data, pagination) => {
      paginations.push(pagination)
    })

    instagramNodeApi.on('finish', () => {
      try {
        paginations.should.have.length(2)
        paginations[0].should.have.property('next_url')
        paginations[0].should.have.property('next_max_id')
        paginations[1].should.be.empty()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  describe('check if retrieve medias', () => {
    it('due 2016-11-02 returns 22 medias in 1 call', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersSelfMediaRecent(undefined, new Date('2016-11-02'))

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 1)
          result.should.have.property('totalMedias', 22)
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('due 2016-10-16 returns 38 medias in 2 calls', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersSelfMediaRecent(undefined, new Date('2016-10-17'))

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 2)
          result.should.have.property('totalMedias', 38)
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('limit to 7 should return 33 medias in 1 calls with null date limit', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersSelfMediaRecent(undefined, 7)

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 1)
          result.should.have.property('totalMedias', 33)
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('limit to 35 should return 40 medias in 2 calls with null date limit', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersSelfMediaRecent(undefined, 35)

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 2)
          result.should.have.property('totalMedias', 40)
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('due 2016-11-02 and limit to 45 returns 22 medias in 1 call', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersSelfMediaRecent(undefined, new Date('2016-11-02'), 45)

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 1)
          result.should.have.property('totalMedias', 22)
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('due 2016-10-17 and limit 500 returns 38 medias in 2 calls', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersSelfMediaRecent(undefined, new Date('2016-10-17'), 500)

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 2)
          result.should.have.property('totalMedias', 38)
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('due 2015-10-10 and limit 7 returns 33 medias in 1 call', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersSelfMediaRecent(undefined, new Date('2015-10-10'), 7)

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 1)
          result.should.have.property('totalMedias', 33)
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('due 2015-10-10 and limit 35 returns 40 medias in 2 calls', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersSelfMediaRecent(undefined, new Date('2015-10-10'), 35)

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 2)
          result.should.have.property('totalMedias', 40)
          done()
        } catch (err) {
          done(err)
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
})
