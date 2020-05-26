var express = require('express')
var router = express.Router()
const db = require('../../db')
 
function random(max, min){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

router.get('/:platform/:user/:task', function(req, res, next){
    var user = req.params.user 
    var platform = req.params.platform 
    var task = req.params.task
    task = task.replace('!givetask ' , '')
    var values = [platform, user , task] 
    const sql = 'INSERT INTO tasklist ("Platform", "RequestedUser", "Task") VALUES ($1, $2, $3);'
    db.query(sql, values, (err, rez) =>{
        if(err){
            throw  err
        }
        res.send("@" + user + " your task to do " + task + " has been added")
    })
})
router.get('/taskCounter',async function(req, res, next){
    db.query('SELECT * FROM tasklist WHERE "Completed"=$1 or "Completed"=$2', ['true','false'], (err,rez) =>{
        if(err){
            throw err
        }
        res.json(rez.rowCount)
    })
})
router.get('/notDone',async function(req, res, next){
    db.query('SELECT * FROM tasklist WHERE "Completed"=$1', ['false'], (err,rez) =>{
        if(err){
            throw err
        }
        res.json(rez.rowCount)
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


router.get('/olmdrop', function(req,res,next){
    var rareDrop=[
        {"name": "Twister bow", "weight": 2},
        {"name": "Kodai insignia", "weight": 2},
        {"name": "Elder Maul", "weight": 2},
        {"name": "Dragon claws", "weight": 3},
        {"name": "Ancestral robe bottom", "weight": 3},
        {"name": "Ancestral robe top", "weight": 3},
        {"name": "Ancestral robe hat", "weight": 3},
        {"name": "Dinh's bulwark", "weight": 3},
        {"name": "Dragon hunter crossbow", "weight": 4},
        {"name": "Twisted buckler", "weight": 4}
    ]
    var otherDrops=[
        {"name": "Death rune", "maxDrop": 3100},
        {"name": "Blood rune", "maxDrop": 4095},
        {"name": "Soul rune", "maxDrop": 6554},
        {"name": "Rune arrow", "maxDrop": 9437},
        {"name": "Dragon arrow", "maxDrop": 926},

        {"name": "Grimy toadflax", "maxDrop": 354},
        {"name": "Grimy ranarr weed", "maxDrop": 164},
        {"name": "Grimy irit leaf", "maxDrop": 668},
        {"name": "Grimy avantoe", "maxDrop": 354},
        {"name": "Grimy kwuarm", "maxDrop": 323},
        {"name": "Grimy snapdragon", "maxDrop": 131},
        {"name": "Grimy cadantine", "maxDrop": 319},
        {"name": "Grimy lantadyme", "maxDrop": 446},
        {"name": "Grimy dwarf weed", "maxDrop": 616},
        {"name": "Grimy torstol", "maxDrop": 153},

        {"name": "Siver ore", "maxDrop": 6553},
        {"name": "Coal", "maxDrop": 6553},
        {"name": "Gold ore", "maxDrop": 2892},
        {"name": "Mithril ore", "maxDrop": 2892},
        {"name": "Adamantite ore", "maxDrop": 729},
        {"name": "Runite ore", "maxDrop": 87},
        {"name": "Uncut sapphire", "maxDrop": 642},
        {"name": "Uncut emerald", "maxDrop": 923},
        {"name": "Uncut ruby", "maxDrop": 524},
        {"name": "Uncut diamond", "maxDrop": 253},

        {"name": "Lizardman fang", "maxDrop": 4898},
        {"name": "Pure essence", "maxDrop": 65535},
        {"name": "Saltpetre", "maxDrop": 5461},
        {"name": "Teak plank", "maxDrop": 1310},
        {"name": "Mahogany plank", "maxDrop": 550},
        {"name": "Dynamite", "maxDrop": 2390},
        {"name": "Torn prayer scroll", "maxDrop": 1},
        {"name": "Dark relic", "maxDrop": 1},
        {"name": "Clue scroll (elite)", "maxDrop": 1}
    ]
    var rng = random(30000,20000)
    var olmet = {"name": "Omlet"}
    var output=[]
    var a1=[]
    var a2=[]
    if(rng/8675 >= random(0,100)){
        a1.push(rareDrop[random(0,9)])
        if((rng/8675)*(a1[0].weight/69)*100 <= random(0,10000)){
            var o1={"name": a1[0].name}
            output.push(o1)
            if(((rng/8675)*(1/53))*100 >= random(0,100))
                res.send("PET DROP " + olmet.name + " " + output[0].name)
            res.send("RARE DROP " + output[0].name)
        }
    }
    else{
        a1.push(otherDrops[random(0,33)])
        a2.push(otherDrops[random(0,33)])
        while(a1 == a2){
            a2=[]
            a2.push(otherDrops[random(0,33)])
        }
        var o1={"drop": random(1, a1[0].maxDrop),"name": a1[0].name}
        var o2={"drop": random(1, a2[0].maxDrop),"name": a2[0].name}
        output.push(o1)
        output.push(o2)
        if(((rng/8675)*(1/53))*100 >= random(0,10000))
            res.send("PET DROP " + olmet.name + " " + output[0].drop + " " + output[0].name + " " + output[1].drop + " " + output[1].name)
        res.send(output[0].drop + " " + output[0].name + " " + output[1].drop + " " + output[1].name)
    }
})

router.post('/markasdone', function(req, res, next){
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
module.exports = router