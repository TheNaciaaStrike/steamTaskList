require('dotenv').config()
const PG = require('pg')

const pool = new PG.Pool({
    user: process.env.dbUser,
	password: process.env.dbPassword,
	database: process.env.dbDatabase,
	host: process.env.dbHost,
	port: process.env.dbPort,
	max: process.env.dbMax,
	idleTimeoutMillis: process.env.idleTimeoutMillis, 
    ssl:process.env.DATABASE_SSL,
})

module.exports = {
	pool,
	query: (text, params, callback) => {
		return pool.query(text, params, callback)
	}
}