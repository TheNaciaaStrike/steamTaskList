var express = require('express')
var router = express.Router()
const db = require('../db')

router.get('/:platform/:user/:task', function(req, res, next){
    var user = req.params.user 
    var platform = req.params.platform 
    var task = req.params.task
    task = task.replace('!givetask ' , '')
    var values = [platform, user , task] 
    const sql = 'INSERT INTO stream."taskList" ("Platform", "RequestedUser", "Task") VALUES ($1, $2, $3);'
    db.query(sql, values, (err, rez) =>{
        if(err){
            throw  err
        }
        res.send("@" + user + " your task to do " + task + " has been added")
    })
})
module.exports = router