'use strict';

const express = require('express');
const router = express.Router();
const BusDAO = require("../database/BusDAO");
const RsrvDAO = require("../database/ReservationDAO");

router.get('/', (req, res)=> {
    const condition = 'bus_code="'+req.query.bus_code+'"';
    console.log(condition);
    BusDAO.searchBus(condition, (buslist)=>{
        res.render('Bus', {'buslist':buslist, "user_id":req.session.user_id});
    });
});

router.get('/searchlist', (req, res)=> {
    const member_id = req.session.used_id;
    RsrvDAO.searchReservations(member_id, (err, bus_codes, seats)=> {
        if (err) {
            res.render('error',{'message':"예매내역 확인에 실패하였습니다.", 'error':err});
            return;
        }
        res.render('reservationList', {
            'member_id': member_id,
            'bus_codes': bus_codes,
            'seats': seats, // 예약된 좌석번호들 ex) [18, 19]
        });
    });
});

router.post('/reserve', (req, res, next) => {
    const bus_code = req.body['bus_code'];
    const member_id = req.body['member_id'];
    const seats = req.body['seats'];
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