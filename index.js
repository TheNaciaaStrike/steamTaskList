require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Pool  = require('pg') 

const pool = new Pool.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:true,
})
pool.connect()

const app = express()
const PORT = process.env.PORT || 3000;

let streamTask = []
 
var taskIDCounter = 1

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

app.get('/', function(req, res) {
    res.render('pages/index');
})

app.get('/stream', (req, res) =>{
    console.log(pool.query('SELECT * FROM "stream"."taskList" WHERE "Completed"=false ;'))
    res.sendFile('pages/test.html',{
        root: path.join(__dirname, './views')
    })
    console.log(streamTask)
})

app.get('/streamJSON',  (req, res) =>{
    pool.query('SELECT * FROM stream."taskList" WHERE "Completed"=false ;', (err, rez) =>{
        if(err){
            throw err
        }
        console.log(rez.rows)
        streamTask = rez.rows
        res.json(streamTask)
    })
})
app.get('/api/twitch/:user/:task',(req, res) =>{
    var user = req.params.user  
    var task = req.params.task
    task = task.replace('!givetask ' , '')
    var values = ['Twitch', user , task] 
    const sql = 'INSERT INTO stream."taskList" ("Platform", "RequestedUser", "Task") VALUES ($1, $2, $3);'
    pool.query(sql, values, (err, rez) =>{
        if(err){
            throw  err
        }
        res.send("@" + user + " your task to do " + task + " has been added")
    })
}) 
app.get('/markasdone/:id',(req,res) =>{ 
    var deltionID = req.params.id
    const sql = 'UPDATE stream."taskList" SET  "Completed"=true WHERE "TaskID"='+deltionID+';'
    pool.query(sql, (err, rez) =>{
        if(err){
            throw err
        }
        console.log(err, rez)
        res.redirect(301, '../stream')
    })
    
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
