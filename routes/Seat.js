'use strict';

const express = require('express');
const router = express.Router();
const RsrvDAO = require("../database/ReservationDAO");

router.get('/:id', (req, res)=> {
    RsrvDAO.searchSeats(req.param.id, (err, reservedSeats) => {
        if (err) {
            console.log(err);
            res.render('error',{'message':"버스 상세 조회에 실패하였습니다.", 'error':err});
            return;
        }
        let seats = [];
        for (let i in reservedSeats) {
            const num = reservedSeats[i]['seat_number'];
            seats[num] = new Seat(num, true);
        }
        for (let i = 1; i <= 28; i++) {
            if (seats[i] === undefined) seats[i] = new Seat(i, false);
        }
        res.render('', { // 좌석 뽑아낼 ejs 입력
            'bus_code': bus_code,
            'seats' :seats
        });
    });
});