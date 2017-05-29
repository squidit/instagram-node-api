const nock = require('nock')

const {
  INSTAGRAM_API_PROTOCOL: instagramApiProtocol,
  INSTAGRAM_API_HOST: instagramApiHost,
  INSTAGRAM_API_VERSION: instagramApiVersion
} = require('../../src/constants')

const {
  TEST_INSTAGRAM_ACCESS_TOKEN
} = process.env

const baseUrl = `${instagramApiProtocol}://${instagramApiHost}/${instagramApiVersion}`

module.exports = function likeMediaMock () {
  beforeEach((done) => {
    nock(baseUrl)
      .get('/media/1482874536541873956_1645525258')
      .query({
        access_token: TEST_INSTAGRAM_ACCESS_TOKEN
      })
      .reply(200, {
        data: {
          type: "image",
          user_has_liked: true,
          users_in_photo: [{
            user: {
              username: "kevin",
              full_name: "Kevin S",
              id: "3",
              profile_picture: "..."
            },
            position: {
              "x": 0.315,
              "y": 0.9111
            }
          }],
          filter: "Walden",
          tags: [],
          comments: {
            count: 2
          },
          caption: null,
          likes: {
            count: 1
          },
          link: "http://instagr.am/p/D/",
          user: {
            username: "kevin",
            full_name: "Kevin S",
            profile_picture: "...",
            id: "3"
          },
          created_time: "1279340983",
          images: {
            low_resolution: {
              url: "http://distillery.s3.amazonaws.com/media/2010/07/16/4de37e03aa4b4372843a7eb33fa41cad_6.jpg",
              width: 306,
              height: 306
            },
            thumbnail: {
              url: "http://distillery.s3.amazonaws.com/media/2010/07/16/4de37e03aa4b4372843a7eb33fa41cad_5.jpg",
              width: 150,
              height: 150
            },
            standard_resolution: {
              url: "http://distillery.s3.amazonaws.com/media/2010/07/16/4de37e03aa4b4372843a7eb33fa41cad_7.jpg",
              width: 612,
              height: 612
            }
          },
          id: "3",
          location: null
        }
      }, {
        'x-ratelimit-limit': '5000',
        'x-ratelimit-remaining': '4989'
      })
    done()
  })
}
