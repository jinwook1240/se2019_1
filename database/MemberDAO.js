'use strict';

if (module.exports.connection !== undefined) return;

module.exports.connection = require('../database/mysql.js');
const conn = module.exports.connection;


class MemberDAO {
    static authMember(id, pw, callback) {
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
    static searchMember(condition, callback) {
        let sql = 'SELECT * FROM jjj.member';
        if(condition!=="" && condition){
            sql += ' WHERE ' + condition;
        }
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err){
                console.log(query_err);
            }
            callback(query_res);
        });
    }

    static insertMember(id, pw, name, phone, email, callback) {
        const sql = 'INSERT INTO jjj.member (member_id, passwd, name, phone, email, coin) VALUES("'+id+'","'+pw+'","'+name+'","'+phone+'","'+email+'", 10000)';
        console.log(sql);
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err){
                console.log(query_err);
            }
            callback(query_err);
        });
    }

    static updateCoin(id, coin, callback ) {
        const sql = 'UPDATE jjj.member SET coin = "'+coin+'" where member_id = "'+id+'"';
        conn.query(sql, (query_err, query_res, query_fields) => {
            let ret;
            if (query_err) {
                console.error(query_err);
                ret =  false;
            } // error
            else ret = true;
            callback(ret);
        });
    }
    static getCoin(member_id, callback) {
        if(!member_id){
            callback(undefined);
            return;
        }
        let condition = 'member_id="'+member_id+'"';
        let sql = 'SELECT coin FROM jjj.member';
        if(condition!=="" && condition){
            sql += ' WHERE ' + condition;
        }
        conn.query(sql, (query_err, query_res, query_fields) => {
            let ret;
            if (query_err){
                ret =  0; // error
                console.log(query_err);
                callback(undefined);
                return;
            }
            console.log("coin : ",query_res[0].coin);
            callback(query_res[0].coin);
        });
    }
}
module.exports = MemberDAO;