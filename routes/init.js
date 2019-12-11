'use strict'

const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    console.log("init : logined : "+req.session.user_id);
    res.render('init', {"user_id":req.session.user_id});
});

module.exports = router;
