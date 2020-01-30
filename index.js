const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000;

let streamTask = [{
    "taskID" : "1",
    "user" : "test",
    "task" : "Zulky",
    "platofrm": "twich"
},{
    "taskID" : "2",
    "user" : "test",
    "task" : "Zulky",
    "platofrm": "twich"
}]

var taskIDCounter = 1

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/stream', (req, res) =>{
    res.sendFile('pages/test.html', {streamTask})
    console.log(streamTask)
})

app.get('/streamJSON', (req, res) =>{
    res.json(streamTask)
    console.log(streamTask)
})

app.get('/api/twitch/:user/:task',(req, res) =>{
    const user = req.params.user
    const task = req.params.task
    var addTask = []
    addTask = {
        "taskID" : taskIDCounter,
        "user" : user,
        "task" : task,
        "platofrm" : "Twitch"
    }
    taskIDCounter ++
    streamTask.push(addTask)
    res.send("taskAdded")
    console.log(streamTask)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))