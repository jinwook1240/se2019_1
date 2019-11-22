var mysql      = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'se2019_1',
  password : '00000000',
  database : 'testDB',
  port     : '3307'
});

module.exports = connection;
