const db = require('./connection');

//This is allowing the client to insert user info and will return a unique id and code
function createUser(users) {
    console.log('hit query')
	const code = generateRandomNumber();
    users.code = code;
   
	return db('users').insert(users).returning(['id', 'code']);


	
}
//This is allowing the client to grab the object id not the array of id
function getUserById(id) {
	return db('users').first().where('id', id);
}
//This generates a random string
function generateRandomNumber() {
	return Math.floor(Math.random() * 100000).toString();
}

function login(code) {
	return db('users').select().where('code', code);
}

getAllUsers = () => {
    return db.select('*').from('users');
}

module.exports = {
	createUser,
	getUserById,
    login,
    getAllUsers
};
