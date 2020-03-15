var express = require('express')
var router = express.Router()
const path = require('path')

router.get('/', function(req, res, next){
    console.log('lgon.html')
    res.sendFile('login.html',{
        root: path.join(__dirname, '../views')
    })
}) 

module.exports = router