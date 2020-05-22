module.exports = {
	renderLogin: (req, res) => {
		res.render('login.ejs',{tohide:'', WaringMessage : 'ummmmmm.....'})
	},

	login: (req, res) => {
		if(req.user.type === 'admin') {
			res.redirect('/admin/panel')
		} else {
			res.redirect('/admin/login')
		}
	},

	renderPanel: (req, res) => {
		res.render('dashboard.ejs')
	},
	renderTasks: (req,res) =>{
		res.render('tasks.ejs')
	}
}
