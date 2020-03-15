const Pool  = require('pg') 

const pool = new Pool.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:process.env.DATABASE_SSL,
})


module.exports = {
    query : (text, params, callback) =>{
        return pool.query(text, params, callback)
    },

}