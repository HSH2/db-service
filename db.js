const mysql = require('mysql');
const constants = require('./constants.js');

function createConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',  
  });
}


function checkDBExist(connection = createConnection(), callback) {
  connection.query(constants.CHECK_DATABASE_EXIST, (error, results, fields) => {
    if (error) {
      connection.end();
      callback(error, connection);
    }
    callback(undefined, connection, results);
  });
}

function createDB(connection = createConnection(), callback) {
  connection.query(constants.CREATE_DATABASE, (error, results, fields) => {
    if (error) {
      connection.end();
      callback(error, connection);
    }
    callback(undefined, connection, results);
  })  
}

checkDBExist(createConnection(), function(error, connection, results) {
  if (!results || !results.length) {
    createDB(connection, function (error, connection, results) {
      if (error) {
        connection.end();
        return;
      }
      connection.end();
      return;
    });
  }
})


// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });

// console.log(constants.CHECK_DATABASE_EXIST);
// console.log(constants.CREATE_SOURCE_TABLE);
// console.log(constants.CREATE_LINK_TABLE);

// connection.query(constants.CREATE_DATABASE, (error, results, fields) => {
//   if (error) {
//     return;
//   }
//   console.log(results);
//   connection.query(constants.CREATE_SOURCE_TABLE, (error, results, fields) => {
//     if (error) {
//       return;
//     }
//     console.log(results);    
//     connection.query(constants.CREATE_LINK_TABLE, (error, results, fields) => {
//       if (error) {
//         return;
//       }
//       console.log(results);      
//     })
//   });
// })

