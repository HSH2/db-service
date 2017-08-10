const DATABASE = 'HOME';
const LINK_TABLE = 'LINK';
const SOURCE_TABLE = 'SOURCE';

const DROP_DATABASE = `DROP DATABASE IF EXISTS ${DATABASE};`;
const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS ${DATABASE};`;
const CHECK_DATABASE_EXIST = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${DATABASE}';`;

const CREATE_SOURCE_TABLE = `CREATE TABLE ${LINK_TABLE} (
  id int(4) PRIMARY NOT NULL AUTO_INCRMENT,
  name VARCHAR(50) NOT NULL, 
  insert_date DATE NOT NULL
);`;
const CREATE_LINK_TABLE = `CREATE TABLE ${LINK_TABLE} (
  id int(4) PRIMARY NOT NULL AUTO_INCRMENT
  title VARCHAR(50) NOT NULL, 
  link VARCHAR(20)  NOT NULL,
  source_id int(4)  NOT NULL,
  insert_date DATE NOT NULL,
  foreign key(source_id) references ${SOURCE_TABLE}(id)
);`;


module.exports = {
  DROP_DATABASE,
  CREATE_DATABASE,
  CHECK_DATABASE_EXIST,
  CREATE_LINK_TABLE,
  CREATE_SOURCE_TABLE
};