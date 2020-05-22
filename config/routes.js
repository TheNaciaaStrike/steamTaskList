const aesEncrypt = require('../passProtect')
const { requiresLogin, requiresAdmin } = require('./middlewares/authorization')
const admin = require('../app/admin')
const users = require('../app/users')



var webRepeat = {
    tohide: '',
    WaringMessage: ''
}

function changeStatus(hide, info){
    webRepeat.tohide = hide
    webRepeat.WaringMessage = info
}
module.exports = (app, passport, db) => {

    var apiRouter = require('./router/api')

    app.use('/api',apiRouter)

    app.get('/register', function(req, res){
        changeStatus('hidden','')
        res.render('register.ejs',webRepeat)
    })
    app.post('/register', async(req,res)=>{
        var userName = req.body.user_name
        var password = req.body.password
        var password_repeat = req.body.password_repeat
        if(password != password_repeat){
            changeStatus('','Passwords do not match')
            res.render('register.ejs',webRepeat)
        }
        var SALT = await aesEncrypt.genSalt(password)
        var HASH = await aesEncrypt.genHash(SALT.salt,password)
        HASH = HASH.hash
        db.query('INSERT INTO "users" ("username", "password", "type") VALUES ($1,$2,$3)', [userName,HASH,'admin'], (err, result) => {
			if(err) {
				changeStatus('','USERNAME WAS TAKEN :)')
                res.render('register.ejs',webRepeat)
            }
            else{ 
                changeStatus('','Register Sucessssssssssssss')
                res.render('login.ejs',webRepeat)
            }
		}) 
    })

    app.get('/login', function(req,res){
        changeStatus('hidden','')
        res.render('login.ejs',webRepeat)
    })
	app.post('/login', passport.authenticate('local', { failureRedirect: '/user/login', successRedirect: '/user/panel', }), users.login)
	app.get('/logout', users.logout)
    app.get('/ping', requiresLogin, users.ping)
    app.get('/user/panel', requiresLogin, users.renderPanel)
    app.get('/user/tasklist',requiresAdmin,admin.renderTasks)

	app.get('/admin/login', admin.renderLogin)
	app.post('/admin/login', passport.authenticate('local', { failureRedirect: '/admin/login', successRedirect: '/admin/panel', }), admin.login)
    app.get('/admin/panel', requiresAdmin, admin.renderPanel)
    app.get('/admin/tasklist',requiresAdmin,admin.renderTasks)
    
	app.use(function (req, res) {
		res.status(404).render('404.ejs')
	})
}