# 소프트웨어공학 텀 프로젝트

## Introduction
This project is made for Software Engineering Term Project.  
We using Expressjs and EJS.  

## Initialize
```shell
git clone https://github.com/orehonyah/se2019_1.git
cd se2019_1
npm install
docker run --name mysql-se2019_1 -e MYSQL_ROOT_PASSWORD=orehonyah -p 3307:3306 -d mysql:5.6 
```

### Init DB
First, do this on shell.
```shell
mysql -u root -p --port 3307 --host 127.0.0.1
```
Then, use below sql code.
```sql
use mysql
create user 'se2019_1'@'%' identified by '00000000';
select host, user, password from user;
```
Check your new user added, and press `Ctrl+D` to go back to shell.

#### test DB
To test if DB is work well,
try below code.
```sql
CREATE DATABASE testDB default CHARACTER SET UTF8;
GRANT ALL PRIVILEGES ON testDB.* TO 'se2019_1'@'%';

CREATE TABLE team_member(
_id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(32) NOT NULL,
belong VARCHAR(100) DEFAULT 'CNU'
) ENGINE=INNODB;
DESC team_member;

INSERT INTO team_member
(name, belong)
VALUES('전지원','충남대학교');
INSERT INTO team_member
(name, belong)
VALUES('정준희','충남대학교');
INSERT INTO team_member
(name, belong)
VALUES('정진욱','충남대학교');
```


### Connect to DB
```shell
mysql -u se2019_1 -p --port 3307 --host 127.0.0.1
```

## Start server
```shell
npm start
```
then you can connect with chrome, which address is `[address]:3000`

## How To see DB Example
Go to branch : [Example_DB](https://github.com/orehonyah/se2019_1/tree/Examplecode_DB)
