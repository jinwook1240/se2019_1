'use strict';
if(module.exports.connection == undefined){
    module.exports.connection = require('../database/mysql.js');
    module.exports.connection.connect();
}
module.exports.somefunction = function(){
    //쿼리문 넣기
};


