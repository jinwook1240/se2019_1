'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.cookie('login', 'username', {
        maxAge: 30000   // 30000밀리초 → 30초
    });
    res.redirect('/');
});

module.exports = router;
