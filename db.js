'use strict'
const winston = require('winston');
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'somefile.log' }),
  ]
});

const { NODE_ENV } = process.env;
const DATABASE = 'home';
const CONFIG = {
  production: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456'
  },
  development: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456'    
  }
}

let initialized = false;
const commandQueue = [];
const dispatch = () => {

}

const serverCon = CONFIG[NODE_ENV || 'development'];
let knex;

function initialize() {
  knex = require('knex')({
    client: 'mysql',
    connection: serverCon,
  });
  // 首先判断服务器中是否有数据库
  // 为什么不直接使用 create database if not exists ? 因为不够准确
  return knex.raw(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${DATABASE}';`)
  .then(function([resultRow]) {
    // 如果数据库已经存在
    if (resultRow.length) {
      logger.info('database already exist');
      return true;
    }
    logger.info('database do not exist');    
    // 数据库不存在，则新建数据库
    return knex.raw(`create DATABASE IF NOT EXISTS ${DATABASE}`)
    .then(function(rows){
      logger.info('create database success');
      // 数据库创建成功，原链接销毁
      // 重新创建针对数据库的连接
      knex.destroy();  
      knex = require('knex')({ 
        client: 'mysql', 
        //  Node.js 不支持 spread operator，本来可以写成 { ...con, database: database }
        connection: Object.assign({}, serverCon, { database: DATABASE }),
      });
      return knex.schema.createTable('Source', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('remark');
        table.timestamps();
      }).then(function() {
        logger.info('create source table success');      
        return knex.schema.createTable('Link', function(table) {
          table.increments('id').primary();
          table.string('title');
          table.text('link');
          table.integer('source_id').unsigned().notNullable().references('id').inTable('Source');
          table.timestamps();
        }).then(function() {
          logger.info('create link table success');
          logger.info('create all table success');
        });
      });
    });
  });
}

function batchInserts() {
  if (!initialized) {
    const initializePromise = initialize();
    initializePromise.then(function(has) {
      logger.info('initialize complete');
    }).catch(function(error) {
      logger.error(error);
    });
  }
}


module.exports = {

}