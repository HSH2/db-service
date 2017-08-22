'use strict'

const { node_env } = process.env;
const database = 'home';
const cfg = {
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
const con = cfg[node_env || 'development'];

let knex = require('knex')({
  client: 'mysql',
  connection: con,
});

knex.raw(`CREATE DATABASE IF NOT EXISTS ${database}`)
.then(function(rows){
  console.log(rows);

  knex.destroy();  
  knex = require('knex')({ 
    client: 'mysql', 
    //  Node.js 不支持 spread operator，本来可以写成 { ...con, database: database }
    connection: Object.assign({}, con, { database: database }),
  });

  knex.schema.createTableIfNotExists('Source', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('remark');
    table.timestamps();
  }).then(function() {
    return knex.schema.createTableIfNotExists('Link', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.text('link');
      table.integer('source_id').unsigned().notNullable().references('id').inTable('Source');
      table.timestamps();
    });
  }).then(function() {
    console.log('Create table success')
  }).catch(function() {
    console.log('Create table failed')
  });

}).catch(function(error) {
  console.log('Create database failed');
});