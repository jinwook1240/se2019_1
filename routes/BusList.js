'use strict'

const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    let statictest = require("./statictest");
    statictest.add();
    res.send("added"+statictest.value);
});

module.exports = router;
