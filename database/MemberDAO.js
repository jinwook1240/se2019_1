'use strict';

if (module.exports.connection == undefined) {
    module.exports.connection = require('../database/mysql.js');
    module.exports.connection.connect();
}

class MemberDAO {
    static searchMember(id, pw, callback) {
        const sql = 'SELECT * FROM member where id = ' + id;
        module.exports.connection.query(sql, function(query_err, query_res, query_fields){
            let ret;
            if (query_err) ret =  0; // error
            else if (query_res.length == 0) ret = 1; // id doesn't exist
            else if (query_res[0]['passwd'] != pw) ret = 2; // password is wrong
            else ret = query_res[0];
            callback(ret);
        });
    }

    static insertMember(id, pw, name, phone, email, callback) {
        const sql = 'INSERT INTO MEMBER VALUES('+id+','+pw+','+name+','+phone+','+email+')'
        module.exports.connection.query(sql, function(query_err, query_res, query_fields){
            let ret;
            if (query_err) ret =  false; // error
            else ret = true
            callback(ret);
        });
    }

    static updateCoin(id, coin) {
        return true;
    }
}