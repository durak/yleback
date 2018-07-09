const yle = require('./services/yle')


const testing = async () => {
  await yle.getLatest()
}

testing()
