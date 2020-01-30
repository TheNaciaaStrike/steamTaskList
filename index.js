const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000;

let streamTask = []

var taskIDCounter = 1

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/stream', (req, res) =>{
    res.sendFile('pages/test.html',{
        root: path.join(__dirname, './views')
    })
    console.log(streamTask)
})

app.get('/streamJSON', (req, res) =>{
    res.json(streamTask)
})

app.get('/api/twitch/:user/:task',(req, res) =>{
    var user = req.params.user
    var task = req.params.task
    console.log(task)
    task = task.replace('!givetask ' , '')
    var addTask = []
    addTask = {
        "taskID" : taskIDCounter,
        "user" : user,
        "task" : task,
        "platofrm" : "Twitch"
    }
    taskIDCounter ++
    streamTask.push(addTask)
    res.send("@" + user + " your task " + task + " has been added")
    console.log(streamTask)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))