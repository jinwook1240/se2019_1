'use strict'

const express = require('expresss');
const router = express.Router();

router.get('/', function(req, res){
    res.render('init');
});

module.exports = router;
