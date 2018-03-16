require('should')
const mock = require('./mock/users-media-recent.mock')
const InstagramNodeApi = require('../')
const errorHandler = require('../src/errors/error-handler')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

describe('users media recent', () => {
  mock()

  it('should return meta object with success', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    const metas = []
    instagramNodeApi.usersMediaRecent('30990380')

    instagramNodeApi.on('data', (data, pagination, meta) => {
      metas.push(meta)
    })

    instagramNodeApi.on('finish', () => {
      try {
        metas.should.have.length(1)
        metas[0].should.have.property('code', 200)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  describe('check if retrieve medias', () => {
    it('should return last 33 medias without date and limit', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersMediaRecent('30990380')

      instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 1)
          result.should.have.property('totalMedias', 33)
          done()
        } catch (error) {
          done(error)
        }
      })
    })

    it('due 2016-11-02 returns 22 medias in 1 call', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersMediaRecent('30990380', new Date('2016-11-02'))

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
      instagramNodeApi.usersMediaRecent('30990380', new Date('2016-10-17'))

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

    it('limit to 35 should return 40 medias in 2 calls with null date limit', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersMediaRecent('30990380', 35)

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
      instagramNodeApi.usersMediaRecent('30990380', new Date('2016-11-02'), 45)

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
      instagramNodeApi.usersMediaRecent('30990380', new Date('2016-10-17'), 500)

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

    it('due 2015-10-10 and limit 35 returns 40 medias in 2 calls', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.usersMediaRecent('30990380', new Date('2015-10-10'), 35)

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
