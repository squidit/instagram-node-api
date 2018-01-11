const convertInstagramDate = require('../shared-functions/convert-instagram-date')

function emitMedias ([data, pagination, meta, remaining, instagramLimit], limit, limitDate, instagramNodeApi) {
  const filteredData = limitDate ? data.filter(item => convertInstagramDate(item.created_time) >= limitDate) : data
  const continueByFilter = filteredData.length === data.length

  instagramNodeApi._mediasFound(filteredData.length)
  instagramNodeApi.emit('data', filteredData, pagination, meta, remaining, instagramLimit, instagramNodeApi._buildResultObject())

  if (
    pagination &&
    pagination.next_url &&
    (limit === 0 || instagramNodeApi.mediasCount < limit) &&
    continueByFilter) {
    instagramNodeApi.usersSelfMediaRecent(pagination.next_url, limitDate, limit)
  } else {
    instagramNodeApi.emit('finish', data, pagination, meta, remaining, instagramLimit, instagramNodeApi._buildResultObject())
  }
}

module.exports = emitMedias
