const EventEmitter = require('events');
const got = require('got');
const parseResponse = require('./parse-response');
const convertInstagramDate = require('./shared-functions/convert-instagram-date');
const {
  INSTAGRAM_API_PROTOCOL: instagramApiProtocol,
  INSTAGRAM_API_HOST: instagramApiHost,
  INSTAGRAM_API_VERSION: instagramApiVersion,
} = require('./constants');

const baseUrl = `${instagramApiProtocol}://${instagramApiHost}/${instagramApiVersion}`;
const defaultOptions = {
  json: true,
};

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
  usersSelfMediaRecent(nextUrl, limitDate) {
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
        const filteredData = limitDate ?
          data.filter(item => convertInstagramDate(item.created_time) >= limitDate) :
          data;
        const continueByFilter = filteredData.length === data.length;
        this._mediasFounded(filteredData.length);

        this.emit('data', filteredData, pagination, meta, remaining, limit, this._buildResultObject());

        if (pagination && pagination.next_url && continueByFilter) {
          this.usersSelfMediaRecent(pagination.next_url, limitDate);
        } else {
          this.emit('finish', data, pagination, meta, remaining, limit, this._buildResultObject());
        }
      })
      .catch((response) => {
        this.emit('err', response.body);
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
        this.emit('err', response.body);
      });
  }

  /* TAGS */
  tagsMediaRecent(tagName, dateLimit, nextUrl) {
    if (!tagName) {
      this.emit('err', new Error('Invalid tagName'));
    }
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
        const filteredData = dateLimit ?
          data.filter(item => convertInstagramDate(item.created_time) >= dateLimit) :
          data;
        const continueByFilter = filteredData.length;

        if (continueByFilter) {
          this._mediasFounded(filteredData.length);
          this.emit('data', filteredData, pagination, meta, remaining, limit, this._buildResultObject());
        }

        if (pagination && pagination.next_url && continueByFilter && dateLimit) {
          this.tagsMediaRecent(tagName, dateLimit, pagination.next_url);
        } else {
          this.emit('finish', filteredData, pagination, meta, remaining, limit, this._buildResultObject());
        }
      })
      .catch((response) => {
        this.emit('err', response.body);
      });
  }
}

module.exports = InstagramNodeApi;
