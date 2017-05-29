const convertInstagramDate = require('../shared-functions/convert-instagram-date')

function emitMedias ([data, pagination, meta, remaining, limit], limitDate, instagramNodeApi) {
  const filteredData = limitDate ? data.filter(item => convertInstagramDate(item.created_time) >= limitDate) : data
  const continueByFilter = filteredData.length === data.length
  instagramNodeApi._mediasFounded(filteredData.length)
  instagramNodeApi.emit('data', filteredData, pagination, meta, remaining, limit, instagramNodeApi._buildResultObject())

  if (pagination && pagination.next_url && continueByFilter) {
      instagramNodeApi.usersSelfMediaRecent(pagination.next_url, limitDate)
    } else {
        instagramNodeApi.emit('finish', data, pagination, meta, remaining, limit, instagramNodeApi._buildResultObject())
      }
}

module.exports = emitMedias
