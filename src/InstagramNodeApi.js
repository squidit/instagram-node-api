const EventEmitter = require('events')
const buildOptionsForGetMedia = require('./shared-functions/build-options-for-get-media')
const buildOptionsForMedias = require('./shared-functions/build-options-for-medias')
const buildOptionsForUser = require('./shared-functions/build-options-for-user')
const buildOptionsForLikeMedia = require('./shared-functions/build-options-for-like-media')
const buildOptionsForUnlikeMedia = require('./shared-functions/build-options-for-unlike-media')
const buildParamsForMedia = require('./shared-functions/build-params-for-media')
const errorHandler = require('./errors/error-handler')
const requestInstagram = require('./instagram-functions/request-instagram')
const postToInstagram = require('./instagram-functions/post-to-instagram')
const deleteToInstagram = require('./instagram-functions/delete-to-instagram')
const emitMedias = require('./events/emit-medias')
const emitLikedMedia = require('./events/emit-liked-media')
const emitUsers = require('./events/emit-users')
const emitTags = require('./events/emit-tags')
const emitLocations = require('./events/emit-locations')

const {
  INSTAGRAM_API_PROTOCOL: instagramApiProtocol,
  INSTAGRAM_API_HOST: instagramApiHost,
  INSTAGRAM_API_VERSION: instagramApiVersion
} = require('./constants')
const baseUrl = `${instagramApiProtocol}://${instagramApiHost}/${instagramApiVersion}`
const defaultOptions = { json: true }

class InstagramNodeApi extends EventEmitter {
  constructor (accessToken) {
    if (!accessToken) throw new Error('No accessToken informed')
    super()
    this.accessToken = accessToken
    this.callsCount = 0
    this.mediasCount = 0
  }

  _instagramCalled () {
    this.callsCount += 1
  }

  _mediasFound (count) {
    this.mediasCount += count
  }

  _buildResultObject () {
    return {
      totalMedias: this.mediasCount,
      totalCalls: this.callsCount
    }
  }

  /* USERS */
  userSearch (username) {
    const url = `${baseUrl}/users/search`
    const options = buildOptionsForUser(defaultOptions, this.accessToken, {q: username})
    this._instagramCalled()
    requestInstagram(url, options)
      .then((params) => emitUsers(params, this))
      .catch((error) => errorHandler(error, this))
  }

  usersMediaRecent (idUser, dateLimitOrLimit, limitOrNull, nextUrl) {
    let { dateLimit, limit } = buildParamsForMedia(dateLimitOrLimit, limitOrNull)
    if (!dateLimit && limit === 0) {
      limit = 33
    }

    if (!idUser) {
      this.emit('err', new Error('Invalid idUser'))
      throw new Error('Invalid idUser')
    }

    const url = nextUrl || `${baseUrl}/users/${idUser}/media/recent`
    const options = buildOptionsForMedias(nextUrl, defaultOptions, this.accessToken)

    this._instagramCalled()
    requestInstagram(url, options)
      .then((params) => emitMedias(params, limit, dateLimit, this))
      .catch((error) => errorHandler(error, this))
  }

  usersSelfMediaRecent (nextUrl, dateLimitOrLimit, limitOrNull) {
    const { dateLimit, limit } = buildParamsForMedia(dateLimitOrLimit, limitOrNull)

    const url = nextUrl || `${baseUrl}/users/self/media/recent`
    const options = buildOptionsForMedias(nextUrl, defaultOptions, this.accessToken)

    this._instagramCalled()
    requestInstagram(url, options)
      .then((params) => emitMedias(params, limit, dateLimit, this))
      .catch((error) => errorHandler(error, this))
  }

  usersSelf () {
    const url = `${baseUrl}/users/self`
    const options = buildOptionsForUser(defaultOptions, this.accessToken)

    requestInstagram(url, options)
      .then((params) => emitUsers(params, this))
      .catch((error) => errorHandler(error, this))
  }

  user (id) {
    const url = `${baseUrl}/users/${id}`
    const options = buildOptionsForUser(defaultOptions, this.accessToken)

    requestInstagram(url, options)
      .then((params) => emitUsers(params, this))
      .catch((error) => errorHandler(error, this))
  }

  /* TAGS */
  tagsMediaRecent (tagName, dateLimitOrLimit, limitOrNull, nextUrl) {
    const { dateLimit, limit } = buildParamsForMedia(dateLimitOrLimit, limitOrNull)

    if (!tagName) {
      this.emit('err', new Error('Invalid tagName'))
      throw new Error('Invalid tagName')
    }
    const url = nextUrl || `${baseUrl}/tags/${encodeURIComponent(tagName.toLowerCase())}/media/recent`
    const options = buildOptionsForMedias(nextUrl, defaultOptions, this.accessToken)

    this._instagramCalled()
    requestInstagram(url, options)
      .then((params) => emitTags(params, limit, dateLimit, tagName, this))
      .catch((error) => errorHandler(error, this))
  }

  /* MEDIAS */
  likeMedia (idMedia) {
    const url = `${baseUrl}/media/${idMedia}/likes`
    const options = buildOptionsForLikeMedia(this.accessToken)

    this._instagramCalled()
    postToInstagram(url, options)
      .then((params) => emitLikedMedia(params, this))
      .catch((error) => errorHandler(error, this))
  }

  unlikeMedia (idMedia) {
    const url = `${baseUrl}/media/${idMedia}/likes`
    const options = buildOptionsForUnlikeMedia(defaultOptions, this.accessToken)

    this._instagramCalled()
    deleteToInstagram(url, options)
      .then((params) => emitLikedMedia(params, this))
      .catch((error) => errorHandler(error, this))
  }

  getMedia (idMedia) {
    const url = `${baseUrl}/media/${idMedia}`
    const options = buildOptionsForGetMedia(defaultOptions, this.accessToken)

    this._instagramCalled()
    requestInstagram(url, options)
      .then((params) => emitMedias(params, 0, null, this))
      .catch((error) => errorHandler(error, this))
  }

  /* LOCATIONS */
  locationMediasRecent (locationId, dateLimitOrLimit, limitOrNull, nextUrl) {
    const { dateLimit, limit } = buildParamsForMedia(dateLimitOrLimit, limitOrNull)

    if (!locationId || isNaN(locationId)) {
      this.emit('err', new Error('Invalid locationId'))
      throw new Error('Invalid locationId')
    }
    const url = nextUrl || `${baseUrl}/locations/${locationId}/media/recent`
    const options = buildOptionsForMedias(nextUrl, defaultOptions, this.accessToken)

    this._instagramCalled()
    requestInstagram(url, options)
      .then((params) => emitLocations(params, limit, dateLimit, locationId, this))
      .catch((error) => errorHandler(error, this))
  }
}

module.exports = InstagramNodeApi
