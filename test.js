const db = require('./db.js');
const log = {
  success(content) {
    console.log(`[SUCCESS] ${content} successed`);  
  },
  failed(content) {
    console.log(`[ERROR] ${content} failed`);  
  }
}

db.checkDBExist().then(function (results, fields, connection) {
  const hasNoDB = results && !results.length;
  if (hasNoDB) {
    log.success('Check DB exist');
    return {
      hasNoDB,
      connection,
    };
  }
}).then(function({ hasNoDB, connection }) {
  if (hasNoDB) {
    return db.createDB(connection);
  }
}).then(function(results, fields, connection) {
  log.success('Create DB');  
  console.log(results, fields, connection);
  // connection.end();
  const dbConnection = db.createDBConnection();
  return db.createSourceTable(dbConnection);
}).then(function(results, fields, connection) {
  log.success('Create Source Table');
  return db.createLinkTable(connection);
}).then(function(results, fields, connection) {
  log.success('Create Link Table');  
}).catch(function(error) {
  log.failed(error);
});

return;

db.checkDBExist(function (error, connection, results, fields) {
  if (error) {
    logFailed('Check database exist ' + error.toString());
    connection.end();
    return;
  }
  logSucces('Check database exist');
  // 如果数据库不存在
  // 则新建数据库
  if (results && !results.length) {
    db.createDB(function (error, connection, results, fields) {
      connection.end();
      if (error) {
        logFailed('Create database ' + error.toString());
        return;        
      }
      logSucces('Create databse');
      // 新建数据库成功后
      // 创建Source表，需要重新连接数据库
      db.createSourceTable(function (error, connection, results, fields) {
        if (error) {
          logFailed('Create source table ' + error.toString());        
          connection.end();
          return;
        }
        logSucces('Create source table');
        // 创建Link表
        db.createLinkTable(function (error, connection, results, fields) {
          if (error) {
            logFailed('Create link table ' + error.toString());                  
            connection.end();
            return;
          }
          logSucces('Create link table');          
        }, connection);
      }, db.createDBConnection());
    }, connection);
  }
})
