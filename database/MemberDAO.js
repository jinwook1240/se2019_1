'use strict';

if (module.exports.connection !== undefined) return;

module.exports.connection = require('../database/mysql.js');
const conn = module.exports.connection;


class MemberDAO {
    static searchMember(id, pw, callback) {
        const sql = 'SELECT * FROM jjj.member WHERE member_id="' + id + '"';
        conn.query(sql, (query_err, query_res, query_fields) => {
            let ret;
            if (query_err){
                ret =  0; // error
                console.log(query_err);
            }
            else if (query_res.length == 0) ret = 1; // id doesn't exist
            else if (query_res[0]['passwd'] != pw) ret = 2; // password is wrong
            else ret = query_res[0];
            callback(ret);
        });
    }

    static insertMember(id, pw, name, phone, email, callback) {
        const sql = 'INSERT INTO jjj.member VALUES("'+id+'","'+pw+'","'+name+'","'+phone+'","'+email+'")';
        conn.query(sql, (query_err, query_res, query_fields) => {
            let ret;
            if (query_err) ret =  false; // error
            else ret = true;
            callback(ret);
        });
    }

    static updateCoin(id, coin) {
        const sql = 'UPDATE jjj.member SET coin = "'+coin+'" where id = "'+id+'"';
        conn.query(sql, (query_err, query_res, query_fields) => {
            let ret;
            if (query_err) ret =  false; // error
            else ret = true;
            callback(ret);
        });
    }
}
module.exports.searchMember = MemberDAO.searchMember;
module.exports.insertMember = MemberDAO.insertMember;
module.exports.updateCoin = MemberDAO.updateCoin;