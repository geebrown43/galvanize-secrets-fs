require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize-secrets'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
  

};
