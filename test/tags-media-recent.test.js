require('should');
const mockMediasRecent = require('./mock/tags-media-recent.mock');
const InstagramNodeApi = require('../');

const { TEST_INSTAGRAM_ACCESS_TOKEN } = process.env;

describe('tags media recent', () => {
  mockMediasRecent();

  it('should return 33 medias in 1 call when date limit is not defined', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN);
    instagramNodeApi.tagsMediaRecent('teste');

    instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
      try {
        result.should.have.property('totalCalls', 1);
        result.should.have.property('totalMedias', 33);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should return a error when tag name is not defined', (done) => {
    const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN);
    try {
      instagramNodeApi.tagsMediaRecent();
      done('passed');
    } catch (err) {
      err.message.should.be.eql('Invalid tagName');
      done();
    }
  });

  describe('check if retrieve medias', () => {
    it('due 2016-11-01 returns 22 medias in 1 call', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN);
      instagramNodeApi.tagsMediaRecent('teste', new Date('2016-11-02'));

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 1);
          result.should.have.property('totalMedias', 22);
          done();
        } catch (err) {
          done(err);
        }
      });
    });

    it('due 2016-10-16 returns 38 medias in 2 calls', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN);
      instagramNodeApi.tagsMediaRecent('teste', new Date('2016-10-17'));

      instagramNodeApi.on('finish', (data, paginations, meta, remaining, limit, result) => {
        try {
          result.should.have.property('totalCalls', 2);
          result.should.have.property('totalMedias', 38);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
});
