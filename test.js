const db = require('./db.js');
const log = {
  success(content) {
    console.log(`[SUCCESS] ${content} successed`);  
  },
  failed(content) {
    console.log(`[ERROR] ${content} failed`);  
  }
}

db.hasNoDB().then(function(connection) {
  log.success('No database');
  return db.createDB(connection);
}).then(function({ results, fields, connection }) {
  log.success('Create database');
  connection.end();
  const dbCon = db.createDBConnection();
  return db.createSourceTable(dbCon);
}).then(function({ results, fields, connection }) {
  log.success('Create source table');
  return db.createLinkTable(connection);
}).then(function({ results, fields, connection}) {
  log.success('Create link table');
  connection.end();
}).catch(function({ error, connection }) {
  log.failed(error);
  connection.end();
});
