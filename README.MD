# 소프트웨어공학 텀 프로젝트

## Introduction
This project is made for Software Engineering Term Project.  
We using Expressjs and EJS.  
```shell
express -e se2019_1
```

## Initialize
```shell
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

### Connect to DB
```shell
mysql -u se2019_1 -p --port 3307 --host 127.0.0.1
```

## Start server
```shell
npm start
```
then you can connect with chrome, which address is `[address]:3000`
