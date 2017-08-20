const mysql = require('mysql');
const constants = require('./constants.js');

function createServerConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',  
  });
}

function createDBConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: constants.DATABASE,
  });
}

function commonCallback(connection, resolve, reject, error, results, fields) {
  if (error) {
    connection.end();
    reject(error, connection);
    return false;
  }
  resolve(results, fields, connection)
}

function promiseWrap(queryStr, connection) {
  return new Promise(function (resolve, reject) {
    connection.query(queryStr, commonCallback.bind(this, connection, resolve, reject));
  });
}


function checkDBExist(connection = createServerConnection()) {
  return promiseWrap(constants.CHECK_DATABASE_EXIST, connection);
}

function createDB(connection = createServerConnection()) {
  return promiseWrap(constants.CREATE_DATABASE, connection);
}

function dropDB(connection = createServerConnection()) {
  return promiseWrap(constants.DROP_DATABASE, connection);
}

function createTable(queryStr, connection = createDBConnection()) {
  return promiseWrap(queryStr, connection);
}

function createSourceTable(connection = createDBConnection()) {
  const queryStr = constants.CREATE_SOURCE_TABLE;
  return createTable(queryStr, connection);
}

function createLinkTable(connection = createDBConnection()) {
  const queryStr = constants.CREATE_LINK_TABLE;  
  return createTable(queryStr, connection);
}

module.exports = {
  createDBConnection,
  checkDBExist,
  createDB,
  dropDB,
  createSourceTable,
  createLinkTable,
}

