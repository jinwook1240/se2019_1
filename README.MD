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

## Connect to DB
```shell
mysql -u root -p --port 3307 --host 127.0.0.1
```

## Start server
```shell
npm start
```
then you can use chrome to connect with below address
`[address]:3000`
