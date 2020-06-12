module.exports = {
	requiresLogin: (req, res, next) => {
		if (req.user) return next()

		res.sendStatus(401)
	},

	requiresAdmin: (req, res, next) => {
		if (req.user && req.user.type === 'admin') return next()

		res.status(401).render('4XX.ejs',{StatusCode: 401})
	}
}
