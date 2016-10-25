require('should');
const mock = require('./mock/users-self-media-recent.mock');
const mockMediasRecent = require('./mock/tags-media-recent.mock');
const InstagramNodeApi = require('../');

const { TEST_INSTAGRAM_ACCESS_TOKEN } = process.env;

describe('users self media recent', () => {
  mockMediasRecent();

  describe('check if retrieve medias', () => {
    it('due 2016-11-01 returns 22 medias in 1 call', (done) => {
      const instagramNodeApi = new InstagramNodeApi(TEST_INSTAGRAM_ACCESS_TOKEN);
      instagramNodeApi.tagsMediaRecent('teste', undefined, new Date('2016-11-02'));

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
      instagramNodeApi.tagsMediaRecent('teste', undefined, new Date('2016-10-17'));

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
