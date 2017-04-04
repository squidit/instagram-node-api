const EventEmitter = require('events')
const isDate = require('lodash/isDate')
const isNumber = require('lodash/isNumber')
const gt = require('lodash/gt')
const buildOptionsForMedias = require('./shared-functions/build-options-for-medias')
const buildOptionsForUser = require('./shared-functions/build-options-for-user')
const errorHandler = require('./errors/error-handler')
const requestInstagram = require('./instagram-functions/request-instagram')
const emitMedias = require('./events/emit-medias')
const emitUsers = require('./events/emit-users')
const emitTags = require('./events/emit-tags')
const {
  INSTAGRAM_API_PROTOCOL: instagramApiProtocol,
  INSTAGRAM_API_HOST: instagramApiHost,
  INSTAGRAM_API_VERSION: instagramApiVersion
} = require('./constants')
const baseUrl = `${instagramApiProtocol}://${instagramApiHost}/${instagramApiVersion}`
const defaultOptions = {
  json: true
}

class InstagramNodeApi extends EventEmitter {
  constructor (accessToken) {
    if (!accessToken) {
      throw new Error('Invalid accessToken informed')
    }
    super()
    this.accessToken = accessToken
    this.callsCount = 0
    this.mediasCount = 0
  }

  _instagramCalled () {
    this.callsCount += 1
  }

  _mediasFounded (count) {
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

  usersMediaRecent (idUser, nextUrl, limitDate) {
    const url = nextUrl || `${baseUrl}/users/${idUser}/media/recent`
    const options = buildOptionsForMedias(nextUrl, defaultOptions, this.accessToken)

    this._instagramCalled()
    requestInstagram(url, options)
      .then((params) => emitMedias(params, limitDate, this))
      .catch((error) => errorHandler(error, this))
  }

  usersSelfMediaRecent (nextUrl, limitDate) {
    const url = nextUrl || `${baseUrl}/users/self/media/recent`
    const options = buildOptionsForMedias(nextUrl, defaultOptions, this.accessToken)

    this._instagramCalled()
    requestInstagram(url, options)
      .then((params) => emitMedias(params, limitDate, this))
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
    const dateLimit = isDate(dateLimitOrLimit) ? dateLimitOrLimit : null
    const limit = (!isDate(dateLimitOrLimit) && isNumber(dateLimitOrLimit)) ? dateLimitOrLimit : (isNumber(limitOrNull) && gt(limitOrNull, 0) ? limitOrNull : 0)

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
}

module.exports = InstagramNodeApi
