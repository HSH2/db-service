const mysql = require('mysql');
const constants = require('./constants.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',  
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

console.log(constants.CHECK_DATABASE_EXIST);
console.log(constants.CREATE_SOURCE_TABLE);
console.log(constants.CREATE_LINK_TABLE);

connection.query(constants.CREATE_DATABASE, (error, results, fields) => {
  if (error) {
    return;
  }
  console.log(results);
  connection.query(constants.CREATE_SOURCE_TABLE, (error, results, fields) => {
    if (error) {
      return;
    }
    console.log(results);    
    connection.query(constants.CREATE_LINK_TABLE, (error, results, fields) => {
      if (error) {
        return;
      }
      console.log(results);      
    })
  });
})

