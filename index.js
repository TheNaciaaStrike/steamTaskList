const express = require('express')
const passport = require('passport')
const db = require('./db')
const https = require('https')

const port = process.env.PORT || 3000
const app = express()

require('./config/passport')(passport, db)
require('./config/express')(app, passport, db.pool)
require('./config/routes')(app, passport, db)

/* const server = app.listen(port, () => {
	console.log('Express app started on port ' + port)
})

server.on('close', () => {
	console.log('Closed express server')

	db.pool.end(() => {
		console.log('Shut down connection pool')
	})
}) */

https.createServer(app)
  .listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}! Go to https://localhost:${PORT}/`)
})