require('dotenv').config()
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const expressValidator = require('express-validator')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const cookieParser = require('cookie-parser')


module.exports = (app, passport, pools) => {
	app.set('view engine', 'ejs')
	app.set('views', path.join(__dirname, '../views'))
	app.set('view engine', 'handlebars')

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
    app.use(expressValidator())
	app.use(cookieParser())
	app.use(session({
		    store: new pgSession({
            pool : pools,
            tableName: 'session'
		}),
		secret: process.env.session_secret,
		resave: false,
        cookie: { maxAge: 14 * 24 * 60 * 60 * 1000,
            //secure:true,
            httpOnly: false}
	}))

	app.use(sslRedirect())
	app.use(passport.initialize())
	app.use(passport.session()) 

	app.use('/', express.static(path.join(__dirname, '../public')))
}
