const axios = require('axios')
const { cacheAdapterEnhancer, throttleAdapterEnhancer } =require('axios-extensions')
const querystring = require('querystring')

const config = require('../utils/config')
const baseUrl = `${config.yleUrl}`
const yquery = require('./yleQuerys')

const http = axios.create({
  headers: { 'Cache-Control': 'no-cache' },
	adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter), {threshold: 1000})
})


const getItems = async (queryData) => {
  //queryData = queryData.mediaobject ? queryData : { ...queryData, mediaobject: 'video' }
  

  const query = querystring.stringify(queryData)
  //const url = `https://external.api.yle.fi/v1/programs/items.json?${query}&${config.yleKey}`
  const url = `${baseUrl}/programs/items.json?${query}&${config.yleKey}`
  //console.log({ query })
  console.log({ url })
  const response = await http.get(url)

  console.log(response.status)
  return response.data.data
}

const getCategories = async () =>{
  const areenaContent = await getCategoriesWithScheme([],'areena-content-classification')
  const areenaAnalytics = await getCategoriesWithScheme([],'areena-analytics-classification')
  return areenaContent.concat(areenaAnalytics)
}

const getCategoriesWithScheme = async (categories = [], scheme) => {
  const url = `https://external.api.yle.fi/v1/programs/categories.json?scheme=${scheme}&offset=${categories.length}&${config.yleKey}`
  const response = await http.get(url)
  const count = response.data.meta.count  

  console.log('inscheme: ', scheme,'length: ',categories.length)

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



