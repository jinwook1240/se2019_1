'use strict';

const express = require('express');
const router = express.Router();
const RsrvDAO = require("../database/ReservationDAO");

router.get('/', (req, res)=> {
    res.render('payment',{"user_id":req.session.user_id,
    'bus':req.query.bus,
    'seat': req.query.seat_list});
});
router.get('/confirm', (req, res)=> {
    console.log("payment confirm : "+req.query);
    const bus_code = req.query['bus_code'];
    const member_id = req.session.user_id;
    const seats = JSON.parse(req.query.seat_sel);
    RsrvDAO.reserveSeats(bus_code, member_id, seats, (err)=> {
        if (err) {
            console.log("err");
            res.render('error',{'message':"좌석 예매에 실패하였습니다.", 'error':err});
            return;
        }
        res.render('init', {
            'message': "성공적으로 예매되었습니다.",
            'user_id': member_id
        });
    });
});


module.exports = router;
