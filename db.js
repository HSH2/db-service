const mysql = require('mysql');
const constants = require('./constants.js');

function createConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',  
  });
}

function commonCallback(connection, callback, error, results, fields) {
  if (error) {
    connection.end();
    callback(error, connection, undefined, undefined);
    return false;
  }
  callback(undefined, connection, results, fields);
}

function createDBConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: constants.DATABASE,
  });
}

function checkDBExist(callback, connection = createConnection()) {
  connection.query(constants.CHECK_DATABASE_EXIST, commonCallback.bind(this, connection, callback));
}

function createDB(callback, connection = createConnection()) {
  connection.query(constants.CREATE_DATABASE, commonCallback.bind(this, connection, callback));
}

function dropDB(callback, connection = createConnection()) {
  connection.query(constants.DROP_DATABASE, commonCallback.bind(this, connection, callback));
}

function createTable(queryStr, callback, connection = createConnection()) {
  connection.query(queryStr, commonCallback.bind(this, connection, callback));
}

function createSourceTable(callback, connection = createConnection()) {
  const queryStr = constants.CREATE_SOURCE_TABLE;
  createTable(queryStr, callback, connection);
}

function createLinkTable(callback, connection = createConnection()) {
  const queryStr = constants.CREATE_LINK_TABLE;
  createTable(queryStr, callback, connection);
}

module.exports = {
  createDBConnection,
  checkDBExist,
  createDB,
  dropDB,
  createSourceTable,
  createLinkTable,
}

