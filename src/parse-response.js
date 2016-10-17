const get = require('lodash/get');

module.exports = function parseResponse(response) {
  try {
    const data = get(response, 'body.data', null);
    const pagination = get(response, 'body.pagination', null);
    const meta = get(response, 'body.meta', null);
    const remaining = parseInt(get(response, 'headers.x-ratelimit-remaining', 0), 10);
    const limit = parseInt(get(response, 'headers.x-ratelimit-limit', 0), 10);

    return Promise.resolve([data, pagination, meta, remaining, limit]);
  } catch (error) {
    return Promise.reject(error);
  }
};
