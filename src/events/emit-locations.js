const convertInstagramDate = require('../shared-functions/convert-instagram-date')

function emitLocation ([data, pagination, meta, remaining, instagramLimit], limit, limitDate, locationId, instagramNodeApi) {
  const filteredData = limitDate ? data.filter(item => convertInstagramDate(item.created_time) >= limitDate) : data
  const continueByFilter = filteredData.length

  if (continueByFilter) {
    instagramNodeApi._mediasFounded(filteredData.length)
    instagramNodeApi.emit('data', filteredData, pagination, meta, remaining, instagramLimit, instagramNodeApi._buildResultObject())
  }

  if (
    pagination &&
    pagination.next_url &&
    (limit === 0 || instagramNodeApi.mediasCount < limit) &&
    continueByFilter &&
    (limitDate || limit > 0)
  ) {
    instagramNodeApi.locationMediasRecent(locationId, limitDate, limit, pagination.next_url)
  } else {
    instagramNodeApi.emit('finish', filteredData, pagination, meta, remaining, instagramLimit, instagramNodeApi._buildResultObject())
  }
}

module.exports = emitLocation
