const expres = require('express')

const router = expres.Router();

router.get('/', (req, res, next) => {
	res.render('index')
})

router.get('/views/create.hbs', (req, res, next) => {
	res.render('create')
})

router.get('/views/login.hbs', (req, res, next) => {
	res.render('login')
})

module.exports = router;