const express = require('express')
const bodyParser = require('body-parser');
const db = require('./db/query')

const port = process.env.PORT || 3000;
const app = express()
const routing = require('./routes/routing')

app.set('view engine', 'hbs')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/', routing)

let arr = ''

createAlert = () => {
	alert(arr)
}

app.post('/api/users', (req, res, next) => {
	db.createUser(req.body)
	//.then(user => res.redirect('/views/login.hbs'))
	.then(user => {
		res.status(201).json(user)
		// for(let i in user){
		// 	console.log(user[i])
		// }
	arr = user[0]
	console.log(typeof user[0])

	createAlert()
	})

	// 	.catch(err => res.status(500).send(err));
    // // .then(()=> {
    //     res.send(users)
//   })
		
});

app.post('/api/secrets', (req, res, next)=> {

	db.createSecret(req.body)
	.then(secrets => res.json(secrets))
	
})

app.get('/api/secrets', (req,res) => {
    db.getAllSecrets()
    .then(secrets => res.json(secrets))
})

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