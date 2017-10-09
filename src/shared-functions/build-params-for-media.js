const isDate = require('lodash/isDate')
const isNumber = require('lodash/isNumber')
const gt = require('lodash/gt')

function buildParamsForMedia (dateLimitOrLimit, limitOrNull) {
  const dateLimit = isDate(dateLimitOrLimit) ? dateLimitOrLimit : null
  const limit = (!isDate(dateLimitOrLimit) && isNumber(dateLimitOrLimit)) ? dateLimitOrLimit : (isNumber(limitOrNull) && gt(limitOrNull, 0) ? limitOrNull : 0)

  return { dateLimit, limit }
}

module.exports = buildParamsForMedia
