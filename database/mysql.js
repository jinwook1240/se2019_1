var mysql      = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
  host     : 'oreh.onyah.net',
  user     : 'se2019_1',
  password : '00000000',
  database : 'jjj',
  port     : '3308'
});

module.exports = connection;
