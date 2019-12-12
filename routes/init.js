'use strict'

const express = require('express');
const router = express.Router();
const MemberDAO = require("../database/MemberDAO");

router.get('/', function(req, res){
    console.log("init : logined : "+req.session.user_id);
    MemberDAO.getCoin(req.session.user_id, (coinres)=> {
        req.session.user_coin = coinres;
        if (req.session.user_id === "admin") {
            res.render('admin', {
                "user_id": req.session.user_id,
                "message": req.query.message,
                'user_coin': req.session.user_coin
            });
        } else {
            res.render('init', {
                "user_id": req.session.user_id,
                "message": req.query.message,
                'user_coin': req.session.user_coin
            });
        }
    });
});

module.exports = router;
