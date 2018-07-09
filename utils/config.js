if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let yleUrl = process.env.YLE_API_URL
let yleKey = process.env.YLE_API_KEY
let yleMedia = process.env.YLE_API_MEDIA

if (process.env.NODE_ENV === 'test') {
}

module.exports = {
  yleUrl,
  yleKey,
  yleMedia
}