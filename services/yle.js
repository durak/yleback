const axios = require('axios')
const config = require('../utils/config')
const Program = require('../models/program')
const baseUrl = `${config.yleUrl}/programs/items.json`


const getLatest = async () => {
  const response = await axios.get(`${baseUrl}?availability=ondemand&mediaobject=video&${config.yleKey}`)

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

  return response.data
}

const something = () => {

}

module.exports = {
  getLatest,
  something
}



