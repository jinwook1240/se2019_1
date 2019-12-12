'use strict';

const express = require('express');
const router = express.Router();
const RsrvDAO = require("../database/ReservationDAO");

router.get('/:id', (req, res)=> {
    RsrvDAO.searchSeats(req.param.id, (err, reservedSeats) => {
        if (err) {
            console.log(err);
            res.render('error',{'message':"Seat 조회에 실패하였습니다.", 'error':err});
            return;
        }
        console.log(JSON.parse(JSON.stringify(reservedSeats)));
        res.send(reservedSeats);
    });
});
module.exports = router;