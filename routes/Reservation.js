'use strict';

const express = require('express');
const router = express.Router();
const BusDAO = require("../database/BusDAO");
const SeatRsrvDAO = require("../database/SeatReservationDAO");

router.get('/', (req, res)=> {
    const condition = 'bus_code="'+req.query.bus_code+'"';
    console.log(condition);
    BusDAO.searchBus(condition, (buslist)=>{
        res.render('Bus', {'buslist':buslist});
    });
});