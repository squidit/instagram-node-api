require('should')
const mockMediasRecent = require('./mock/tags-media-recent.mock')
const mockMaxReqExceeded = require('./mock/request-instagram-access-token-max-request-exceed')
const InstagramNodeApi = require('../')
const errorHandler = require('../src/errors/error-handler')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

describe('tags media recent', () => {
  mockMediasRecent()
  mockMaxReqExceeded()

  it('should return 33 medias in 1 call when date limit is not defined', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    instagramNodeApi.tagsMediaRecent('teste')

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

  it('should return a error when tag name is not defined', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
    try {
      instagramNodeApi.tagsMediaRecent()
      done(new Error('passed'))
    } catch (err) {
      err.message.should.be.eql('Invalid tagName')
      done()
    }
  })

  describe('check if retrieve medias', () => {
    it('due 2016-11-01 returns 22 medias in 2 call', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.tagsMediaRecent('teste', new Date('2016-11-02'))

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 2)
          result.should.have.property('totalMedias', 22)
          done()
        } catch (err) {
          done(err)
        }
      })
    })

    it('due 2016-10-16 returns 38 medias in 2 calls', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.tagsMediaRecent('teste', new Date('2016-10-17'))

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

    it('due 2016-10-16 and limit 14 should return 33 medias in 1 calls', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.tagsMediaRecent('teste', new Date('2016-10-17'), 14)

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

    it('limit to 14 should return 40 medias in 2 calls with null date limit', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.tagsMediaRecent('teste', null, 35)

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

    it('limit to 14 should return 40 medias in 2 calls without date limit', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN)
      instagramNodeApi.tagsMediaRecent('teste', 35)

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
