/**
 * 判断数据库是否存在
 * 
 * https://stackoverflow.com/questions/838978/how-to-check-if-mysql-database-exists
 * 
 * SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'DBName'
 * 
 * 如果你想检测之后直接创建的话，执行
 * 
 * CREATE DATABASE IF NOT EXISTS DBName;
 * 
 * 另一个更慢的方法是：
 * 
 * SHOW DATABASES LIKE 'dbname';
 */