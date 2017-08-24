const { NODE_ENV } = process.env;
const DATABASE = 'home';
const DB_CONFIG = {
  production: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456'
  },
  development: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456'    
  }
}

module.exports = {
  serverConnection: DB_CONFIG[NODE_ENV || 'development'],
  DATABASE,
}