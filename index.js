//Boot componets
require('dotenv').config()
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
//Router Congfig
var streamRouter = require('./routes/stream')
var apiRouter = require('./routes/api')
var indexRouter = require('./routes/main')
//WebConfig
const app = express()
const PORT = process.env.PORT || 3000;
//Web ViewEngine static folder and JSON settings
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.use(express.static('views'))
//Routers
app.use('/', indexRouter)
app.use('/stream', streamRouter)
app.use('/api', apiRouter)

//Create Server
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}! Go to https://localhost:${PORT}/`)
})

