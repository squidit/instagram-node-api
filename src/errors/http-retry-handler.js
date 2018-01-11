module.exports = (err, fn, callCount, url, options) => {
  if (callCount <= require('../constants').MAX_RETRY_COUNT) return fn(url, options, callCount++)
  throw err
}
