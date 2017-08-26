'use strict'

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'db-service'});

const { connection, database } = require('./config.js');

let initialized = false;
let knex;

function initialize() {
  knex = require('knex')({
    client: 'mysql',
    connection: connection,
  });
  // 首先判断服务器中是否有数据库
  // 为什么不直接使用 create database if not exists ? 因为不够准确
  return knex.raw(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${database}';`)
  .then(function([resultRow]) {
    // 如果数据库已经存在
    if (resultRow.length) {
      logger.info('database already exist');
      return true;
    }
    logger.info('database do not exist');    
    // 数据库不存在，则新建数据库
    return knex.raw(`create DATABASE IF NOT EXISTS ${database}`)
    .then(function(rows){
      logger.info('create database success');
      initialized = true;
      // 数据库创建成功，原链接销毁
      // 重新创建针对数据库的连接
      knex.destroy();  
      knex = require('knex')({ 
        client: 'mysql', 
        //  Node.js 不支持 spread operator，本来可以写成 { ...con, database: database }
        connection: Object.assign({}, connection, { database: database }),
      });
      return knex.schema.createTable('Source', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('remark');
        table.timestamps(true, true);
      }).then(function() {
        logger.info('create source table success');      
        return knex.schema.createTable('Link', function(table) {
          table.increments('id').primary();
          table.string('title');
          table.text('link');
          table.integer('source_id').unsigned().notNullable().references('id').inTable('Source');
          table.timestamps(true, true);
        }).then(function() {
          logger.info('create link table success');
          logger.info('create all table success');
        });
      });
    });
  });
}

function check() {
  if (initialized) {
    return Promise.resolve();
  } else {
    return new Promise(function(resolve, reject) {
      if (!initialized) {
        const initializePromise = initialize();
        initializePromise.then(function(dbExists) {
          if (!dbExists) {
            logger.info('initialize complete');
          }
          resolve();
        }).catch(function(error) {
          logger.error(error);
          reject(error);
        });
      }
    });
  }
}

function drop() {
  knex = require('knex')({
    client: 'mysql',
    connection: connection,
  });
  return knex.raw(`DROP DATABASE IF EXISTS ${database}`)
  .then(function() {
    initialized = false;
    logger.info('drop database success');    
    knex.destroy();
  }, function() {
    logger.info('drop database failed');    
    knex.destroy();
  });
}

function batchInsertSources(sources) {
  return check().then(function() {
    return knex('Source')
      .insert(sources)
      .then(function() {
        logger.info(`insert sources success, data length ${sources.length}`);
      });
  })
}

function batchInsertLinks(links) {
  return check().then(function() {
    return knex('Link')
      .insert(links)
      .then(function() {
        logger.info(`insert links success, data length ${links.length}`);        
      });
  })
}


module.exports = {
  initialize,
  drop,
  batchInsertLinks,
  batchInsertSources,
}