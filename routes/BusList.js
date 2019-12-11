'use strict';

const express = require('express');
const router = express.Router();
const BusDAO = require("../database/BusDAO");


router.get('/', (req, res)=> {
    let condition = undefined;
    let beforecondition = false;
    if(req.query.date && req.query.date !== ""){
        condition = 'date="'+req.query.date;
        beforecondition = true;
    }
    if(req.query.dptloc && req.query.dptloc !== ""){
        if(beforecondition){
            condition+= " and"
        }
        condition+='" departure_location="'+req.query.dptloc
        beforecondition = true;
    }
    if(req.query.arvloc && req.query.arvloc !== ""){
        if(beforecondition){
            condition+= " and"
        }
        condition+='" arrival_location="'+req.query.arvloc+'"';
        beforecondition = true;
    }

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
