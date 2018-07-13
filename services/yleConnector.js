const axios = require('axios')
const querystring = require('querystring')

const config = require('../utils/config')
const baseUrl = `${config.yleUrl}/programs/items.json`
const yquery = require('./yleQuerys')




const getItems = async (queryData) => {
  //queryData = queryData.mediaobject ? queryData : { ...queryData, mediaobject: 'video' }
  

  const query = querystring.stringify(queryData)
  const url = `https://external.api.yle.fi/v1/programs/items.json?${query}&${config.yleKey}`
  console.log({ query })
  console.log({ url })
  const response = await axios.get(url)
  return response.data.data
}

const getCategories3 = async (categories = []) => {
   const url = `https://external.api.yle.fi/v1/programs/categories.json?scheme=areena-content-classification&offset=${categories.length}&${config.yleKey}`
  // const url = `https://external.api.yle.fi/v1/programs/categories.json?offset=${categories.length}&${config.yleKey}`
  
  const response = await axios.get(url)
  const count = response.data.meta.count
  const limit = response.data.meta.limit
  console.log('length', categories.length)
  console.log('count', count)

  if (categories.length < count) {
    return await getCategories(categories.concat(response.data.data))
  } else {
    return categories
  }
}

const getCategories = async () =>{
  const areenaContent = await getCategoriesWithScheme([],'areena-content-classification')
  const areenaAnalytics = await getCategoriesWithScheme([],'areena-analytics-classification')
  return areenaContent.concat(areenaAnalytics)
}

const getCategoriesWithScheme = async (categories = [], scheme) => {
  const url = `https://external.api.yle.fi/v1/programs/categories.json?scheme=${scheme}&offset=${categories.length}&${config.yleKey}`
  const response = await axios.get(url)
  const count = response.data.meta.count  

  console.log(categories.length)

  if (categories.length < count) {
    return await getCategoriesWithScheme(categories.concat(response.data.data), scheme)
  } else {
    return categories
  }
}


module.exports = {
  getCategories,
  getItems
}



