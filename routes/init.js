'use strict'

const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    console.log("init : logined : "+req.session.user_id);
    if(req.session.user_id === "admin"){
        res.render('admin', {
            "user_id":req.session.user_id,
            "message": undefined
        });
    }
    else{
        res.render('init', {
            "user_id":req.session.user_id, 
            "message": undefined
    });
    }
});

module.exports = router;
