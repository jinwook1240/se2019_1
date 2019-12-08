'use strict'

const express = require('express');
const router = express.Router();

const db_connection = require('../database/mysql.js');
db_connection.connect();
/* GET home page. */
class Bus {
    constructor(id, pw, name, phone, email, coin) {
        this.id = id
        this.pw = pw
        this.name = name
        this.phone = phone
        this.email = email
        this.coin = coin
    }

    signIn() {

    }

    signUp() {

    }
}
router.get('/', function(req, res) {
    db_connection.query('SELECT * FROM bus', function(query_err, query_res, query_fields){
        if(query_err){
            res.send(query_err);
        }
        res.render('index', { title: 'Express', bus:query_res });
    });
});

module.exports = router;
