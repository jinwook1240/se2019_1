'use strict';

const express = require('express');
const router = express.Router();
const BusDAO = require("../database/BusDAO");


router.get('/', (req, res)=> {
    BusDAO.getBusList((queryres)=>{
        res.render('BusList', {'buslist':queryres});
    });
});
router.get('/search', (req, res)=> {
    BusDAO.getBusList((queryres)=>{
        res.render('BusList', {'buslist':queryres});
    });
});

module.exports = router;
