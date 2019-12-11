'use strict';

const express = require('express');
const router = express.Router();
const BusDAO = require("../database/BusDAO");


router.get('/', (req, res)=> {
    const condition = 'date="'+req.query.date
        +'" and departure_location="'+req.query.dptloc
        +'" and arrival_location="'+req.query.arvloc+'"';
    console.log("condition:"+condition);
    BusDAO.searchBus(condition, (buslist)=>{
        console.log(buslist);
        res.render('BusList', {
            'buslist': buslist,
            'bus_codes': new Array()
        });
    });
});

router.get('/search', (req, res)=> {//?condition= 쿼리 조건문
    BusDAO.searchBus(req.query.condition, (queryres)=>{
        res.render('BusList', {'buslist':queryres});
    });
});

module.exports = router;
