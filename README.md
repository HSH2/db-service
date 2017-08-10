
- 在数据库语句中什么时候用单引号还是斜分号
https://stackoverflow.com/questions/11321491/when-to-use-single-quotes-double-quotes-and-backticks-in-mysql/11321508#11321508


 - 判断数据库是否存在：
 
 https://stackoverflow.com/questions/838978/how-to-check-if-mysql-database-exists
 
 ```mysql
 SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'DBName'
 ```

 - 如果你想检测之后直接创建的话，执行
 
 ```mysql
 CREATE DATABASE IF NOT EXISTS DBName;
 ```
 
 - 另一个更慢的方法是：
 
 ```mysql
 SHOW DATABASES LIKE 'dbname';
 ```

- 删除数据库：

```mysql
DROP DATABASE IF EXISTS tutorial_database;
```

- 创建数据库表：
```mysql
CREATE TABLE table_name (
    id: 
    title VARCHAR(20) NOT NULL AUTO_INCREMENT, /* 标题 */
    link VARCHAR(20)  NOT NULL, /* 链接 */
    source_id int(11)  NOT NULL, /* 来源id */
    insert_date DATE NOT NULL, /* 插入时间 */
    primary key(id)
);
```
- 检测数据库是否是utf-8编码
```mysql
show variables like '%character%';
```