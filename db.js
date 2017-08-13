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

function checkDBExist(callback, connection = createConnection()) {
  connection.query(constants.CHECK_DATABASE_EXIST, commonCallback.bind(this, connection, callback));
}

function createDB(callback, connection = createConnection()) {
  connection.query(constants.CREATE_DATABASE, commonCallback.bind(this, connection, callback));
}

function dropDB(callback, connection = createConnection()) {
  connection.query(constants.DROP_DATABASE, commonCallback.bind(this, connection, callback));
}

checkDBExist(function (error, connection, results, fields) {
  if (error) {
    console.log(error);
    connection.end();
    return;
  }
  console.log('HAVE DB--->', results, connection.id);
  if (results.length) {
    dropDB(function (error, connection, results, fields) {
      if (error) {
        console.log(error);
        connection.end();
        return;
      }
      console.log('DROP DB--->', results, connection.id);
      connection.end();
    }, connection);
  } else {
    createDB(function (error, connection, results, fields) {
      if (error) {
        console.log(error);
        connection.end();
        return;
      }
      console.log('CREATE DB--->', results, connection.id);
      connection.end();
    }, connection);
  }
});

