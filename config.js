require('dotenv').config();
const { NODE_ENV } = process.env;
const DB_CONFIG = {
  production: {
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
    },
    database: 'home',
  },
  development: {
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
    },
    database: 'home',
  },
  test: {
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
    },
    database: 'test',
  }
}

module.exports = DB_CONFIG[NODE_ENV || 'development'];
