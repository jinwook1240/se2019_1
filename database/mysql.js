
if(module.exports.connect === undefined){
  module.exports = require('mysql').createConnection({
    host     : 'oreh.onyah.net',
    user     : 'root',
    password : 'orehonyah',
    database : 'jjj',
    port     : '3308'
  });
  module.exports.connect();
}
