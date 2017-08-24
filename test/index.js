const db = require('../db.js');
const insert = require('./insert.js');

db.drop().then(function() {
  return db.initialize();
}).then(function() {
  db.drop().then(function() {
    return insert.batchInsertSourcesTest();
  }).then(function() {
    return insert.batchInsertLinksTest();    
  })
})