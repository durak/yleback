const apiConnector = require('./yleConnector')
const yq = require('./yleQuerys')

const getCategories = async () => {
  const categories = await apiConnector.getCategories()
  return categories
}

const getItemWithId = async (id) => {
  const response = await apiConnector.getItems({ id })
  return response
}

const getItems = async (queryData) => {

  // default settings: video & ondemand & newest first order
  queryData = queryData[yq.Mediaobject.NAME] ? queryData : { ...queryData, [yq.Mediaobject.NAME]: yq.Mediaobject.VALUES.VIDEO }
  queryData = queryData[yq.Availability.NAME] ? queryData : { ...queryData, [yq.Availability.NAME]: yq.Availability.VALUES.ONDEMAND }
  queryData = queryData[yq.Order.NAME] ? queryData : { ...queryData, [yq.Order.NAME]: yq.Order.VALUES.PUBLICATION_STARTTIME_DESC }
  const response = await apiConnector.getItems(queryData)
  return response
}

module.exports = { getCategories, getItemWithId, getItems }