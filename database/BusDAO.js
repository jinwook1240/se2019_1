'use strict';
if(module.exports.connection == undefined){
    module.exports.connection = require('../database/mysql.js');
    module.exports.connection.connect();
}
module.exports.somefunction= ()=>{
    //쿼리문 넣기
};


