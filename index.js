const http = require('http')
const express = require('express')
// const cors = require('cors')
const path = require('path')

const app = express()
const config = require('./utils/config')
const categoriesRouter = require('./controllers/categories')
const itemsRouter = require('./controllers/items')


// MIDDLEWARE
app.use(express.json())
app.use(express.static('build'))

// ROUTES
app.use('/api/categories', categoriesRouter)
app.use('/api/items', itemsRouter)

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

// SERVER
const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  console.log('connection closed')
})

module.exports = { app, server }

/* 
const testing = async () => {
  await yle.getLatest()
  //await yle.getCategories()
}

testing()
 */