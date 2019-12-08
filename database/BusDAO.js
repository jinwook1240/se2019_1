'use strict'

const express = require('express');
const router = express.Router();

const db_connection = require('./mysql.js');
db_connection.connect();
/* GET home page. */
router.get('/', function(req, res) {
    db_connection.query('SELECT * FROM team_member', function(query_err, query_res, query_fields){
        if(query_err){
            res.send(query_err);
        }
        res.render('index', { title: 'Express', member:query_res });
    });
});
class BusDAO {
    constructor() {
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
module.exports = router;
