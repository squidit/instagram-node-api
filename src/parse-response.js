module.exports = function parseResponse (response) {
  try {
    const data = response.body['data'] || null
    const pagination = response.body['pagination'] || null
    const meta = response.body['meta'] || null
    const remaining = parseInt(response.headers['x-ratelimit-remaining'] || 0, 10)
    const limit = parseInt(response.headers['x-ratelimit-limit'] || 0, 10)

    return Promise.resolve([data, pagination, meta, remaining, limit])
  } catch (error) {
    return Promise.reject(error)
  }
}
