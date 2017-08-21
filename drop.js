const db = require('./db.js');

db.dropDB().then(function({ results, fileds, connection }) {
  connection.end();
}, function({ error, connection }) {
  connection.end();  
})