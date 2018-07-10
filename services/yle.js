const axios = require('axios')
const querystring = require('querystring')

const config = require('../utils/config')
const Program = require('../models/program')
const baseUrl = `${config.yleUrl}/programs/items.json`

const parameters = {
  id: (id) => { return {id: id } },
  q: (query) => { q: query },
  category: (id) => { category: id },
  series: (id) => { series: id },

}

const getLatest = async () => {

  let wasd = ({id, query, category, limit, ondemand, future, video, audio}) => {

    const Type = Object.freeze({
      PROGRAM: "program",
      CLIP: "clip",
      TVCONTENT: "tvcontent",
      TVPROGRAM: "tvprogram",
      TVCLIP: "tvclip",
      RADIOCONTENT: "radiocontent",
      RADIOPROGRAM: "radioprogram",
      RADIOCLIP: "radioclip"
    })

    const Order = Object.freeze({
      PLAYCOUNT_6H_ASC: "playcount.6h:asc",
      PLAYCOUNT_6H_DESC: "playcount.6h:desc",
      PLAYCOUNT_24H_ASC: "playcount.24h:asc",
      PLAYCOUNT_24H_DESC: "playcount.24h:desc",
      PLAYCOUNT_WEEK_ASC: "playcount.week:asc",
      PLAYCOUNT_WEEK_DESC: "playcount.week:desc",
      PLAYCOUNT_MONTH_ASC: "playcount.month:asc",
      PLAYCOUNT_MONTH_DESC: "playcount.month:desc",
      PUBLICATION_STARTTIME_ASC: "publication.starttime:asc",
      PUBLICATION_STARTTIME_DESC: "publication.starttime:desc",
      PUBLICATION_ENDTIME_ASC: "publication.endtime:asc",
      PUBLICATION_ENDTIME_DESC: "publication.endtime:desc",
      UPDATED_ASC: "updated:asc",
      UPDATED_DESC: "updated:desc"
    })

    const Availability = Object.freeze({
      ONDEMAND: "ondemand",
      FUTURE_ONDEMAND: "future-ondemand",
      FUTURE_SCHEDULED: "future-scheduled",
      IN_FUTURE: "in-future"
    })

    console.log('ondemand', Availability.ONDEMAND)

    return {
    id: id,
    q: query,
    category,
    limit,
    availability: ondemand ? 'ondemand' : future ? 'future-ondemand' : null,
    mediaobject: video ? video : audio ? audio : null
  }}
  const a = wasd({id: 'parsId'})
  //console.log(a)
  //console.log(querystring.stringify(wasd({id: 'parsId'})))
  //console.log('string', querystring.stringify(wasd({id: 'parsId'})))
  let asd = querystring.stringify(parameters.id('tewtwe')    )
  //asd = parameters.id('asd')
  //console.log('query', asd)
  //console.log('test')
  //console.log(parameters.id('id'))
  //console.log('----------')
  const test = (id) => {return {asd: id}}
  //console.log(test('iidee'))
  //console.log((() => {return 'id'})())

  const request = wasd({query: 'japan', limit:2, future: true})
  const sRequest = querystring.stringify(request)
  console.log(sRequest)
  //const response = await axios.get(`${baseUrl}?availability=ondemand&mediaobject=video&${config.yleKey}`)
  const response = await axios.get(`${baseUrl}?${sRequest}&${config.yleKey}`)

  const programs = response.data.data.map((program) => {
    const tv = program.partOfSeries

    return new Program({
      title: program.title.fi,
      description: program.description.fi,
      yle_id: program.id,
      _id: program.id
    })
  })
  //console.log(response.data.data[0].id)
  console.log(programs)
  //console.log(response)


  return response.data
}

const getCategories = async () => {
  const url = `https://external.api.yle.fi/v1/programs/categories.json?${config.yleKey}`
  const response = await axios.get(url)
  response.data.data.map((category) => {
    console.log(category)
  })
}

module.exports = {
  getLatest,
  getCategories
}



