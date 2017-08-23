const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',  
});
connection.query('DROP DATABASE IF EXISTS `home`', function() {
  connection.end();
});