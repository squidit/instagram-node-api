const EventEmitter = require('events');
const got = require('got');
const parseResponse = require('./parse-response');
const {
  INSTAGRAM_API_PROTOCOL: instagramApiProtocol,
  INSTAGRAM_API_HOST: instagramApiHost,
  INSTAGRAM_API_VERSION: instagramApiVersion,
} = require('./constants');

const baseUrl = `${instagramApiProtocol}://${instagramApiHost}/${instagramApiVersion}`;
const defaultOptions = { json: true };

class InstagramNodeApi extends EventEmitter {
  constructor(accessToken) {
    if (!accessToken) {
      throw new Error('Invalid accessToken informed');
    }
    super();
    this.accessToken = accessToken;
    this.callsCount = 0;
    this.mediasCount = 0;
  }

  _instagramCalled() {
    this.callsCount += 1;
  }

  _mediasFounded(count) {
    this.mediasCount += count;
  }

  _buildResultObject() {
    return {
      totalMedias: this.mediasCount,
      totalCalls: this.callsCount,
    };
  }

  /* USERS */
  usersSelfMediaRecent(nextUrl) {
    const url = nextUrl || `${baseUrl}/users/self/media/recent`;
    const options = nextUrl ? defaultOptions : Object.assign({}, defaultOptions, {
      query: {
        access_token: this.accessToken,
        count: 33,
      },
    });

    this._instagramCalled();
    got.get(url, options)
      .then(parseResponse)
      .then(([data, pagination, meta, remaining, limit]) => {
        this._mediasFounded(data.length);
        this.emit('data', data, pagination, meta, remaining, limit, this._buildResultObject());

        if (pagination && pagination.next_url) {
          this.usersSelfMediaRecent(pagination.next_url);
        } else {
          this.emit('finish', data, pagination, meta, remaining, limit, this._buildResultObject());
        }
      })
      .catch((response) => {
        this.emit('error', response.body);
      });
  }

  usersSelf() {
    const url = `${baseUrl}/users/self`;
    const options = Object.assign({}, defaultOptions, {
      query: {
        access_token: this.accessToken,
      },
    });

    got.get(url, options)
      .then(parseResponse)
      .then(([data, , meta, remaining, limit]) => {
        this.emit('data', data, meta, remaining, limit);
        this.emit('finish', data, meta, remaining, limit);
      })
      .catch((response) => {
        this.emit('error', response.body);
      });
  }

  /* TAGS */
  tagsMediaRecent(tagName, nextUrl) {
    const url = nextUrl || `${baseUrl}/tags/${tagName}/media/recent`;
    const options = nextUrl ? defaultOptions : Object.assign({}, defaultOptions, {
      query: {
        access_token: this.accessToken,
        count: 33,
      },
    });

    this._instagramCalled();
    got.get(url, options)
      .then(parseResponse)
      .then(([data, pagination, meta, remaining, limit]) => {
        this.mediasFounded(data.length);
        this.emit('data', data, pagination, meta, remaining, limit, this.buildResultObject());

        if (pagination && pagination.next_url) {
          this.tagsMediaRecent(pagination.next_url);
        } else {
          this.emit('finish', data, pagination, meta, remaining, limit, this.buildResultObject());
        }
      })
      .catch((response) => {
        this.emit('error', response.body);
      });
  }
}

module.exports = InstagramNodeApi;
