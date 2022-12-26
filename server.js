'use strict'

const responseHelper = require('express-response-helper').helper()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./app/models')

const app = express()
// set port
const port = process.env.PORT || 3000

// attach the middleware before any route definition
app.use(responseHelper)

// CORS config
const corsOptions = {
  origin: 'http://localhost:3001',
}
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.send('Hello!')
})

// routes
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

app.get('/user', async (req, res) => {
  const users = await db.User.findAll()
  res.respond(users, 200)
})

app.get('/404', function (req, res) {
  res.failNotFound('Resoure Not Found')
})

// listen for request
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
