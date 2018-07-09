const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
  title: String,
  description: String,
  yle_id: String,
})

const Program = mongoose.model('Program', programSchema)

module.exports = Program