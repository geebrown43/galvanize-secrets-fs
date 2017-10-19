const express = require('express')
const bodyParser = require('body-parser');
const db = require('./db/query')

const port = process.env.PORT || 3000;
const app = express()

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.render('create')
})

app.post('/api/users', (req, res, next) => {
    console.log('hit post')
    db.createUser(req.body)
    .then(user => res.status(201).json(user))
		.catch(err => res.status(500).send(err));
    // .then(()=> {
    //     res.send('hi')
    // })
		
});


app.get('/api/users', (req,res) => {
    db.getAllUsers()
    .then(users => res.json(users))
})
//This is allowing the client to login based on a unique code
app.post('/api/users/login', (req, res, next) => {
	db.login(req.body.code)
		.then(users => {
			if(!users) {
				res.sendStatus(401);
			} else {
				res.json(users);
			}
		}).catch(err => {
			res.status(500).send(err);
		});
});

app.get('/api/users/:id', (req, res, next) => {
	const code = req.query.code;
	const id = req.params.id;

	db.getUserById(id)
		.then(users => {
			if(!users) {
				res.sendStatus(401);
			} else if(users.code !== code) {
				res.sendStatus(401);
			} else {
				res.json(users);
			}
		})
		.catch(err => res.status(500).send(err));
});

app.listen(port, () => {
	console.log(`app listening on port: ${port}`);
});