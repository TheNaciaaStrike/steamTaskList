var express = require('express')
var router = express.Router()
const path = require('path')

const db = require('../db')

var json = []

router.get('/', function(req, res, next){
    res.sendFile('pages/test.html',{
        root: path.join(__dirname, '../views')
    }) 
}) 
router.post('/', function(req, res, next){
    const sql = 'UPDATE stream."taskList" SET  "Completed"=true WHERE "TaskID"= $1;'
    var variables = [req.body.TaskID]
    db.query(sql,variables,(err,rez)=>{
        if(err){
            throw err
        }
        res.sendFile('pages/test.html',{
            root: path.join(__dirname, '../views')
        })
    })
}) 

router.get('/json', function(req,res,next){
    db.query('SELECT * FROM stream."taskList" WHERE "Completed"= $1 ;', ['false'], (err, rez) =>{
        if(err){
            throw err
        }
        json = rez.rows
        res.send(json)
    })
})
module.exports = router