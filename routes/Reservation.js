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
    const member_id = req.query.member_id;
    RsrvDAO.searchReservations(req.query.member_id, (err, bus_code, seat_nums)=> {
        if (err) {
            res.render('error',{'message':"예매내역 확인에 실패하였습니다.", 'error':err});
            return;
        }
        res.render('reservationList', {
            'member_id': member_id,
            'bus_code': bus_code,
            'seat_nums': seat_nums, // 예약된 좌석번호들 ex) [18, 19]
        });
    });
});

router.post('/reserve', (req, res)=> {
    console.log("1");
    const bus_code = req.query['bus_code'];
    const member_id = req.query['member_id'];
    const seats = req.query['seats'];
    RsrvDAO.reserveSeats(bus_code, member_id, seats, (err)=> {
        console.log("7");
        if (err) {
            console.log("err");
            res.render('error',{'message':"좌석 예매에 실패하였습니다.", 'error':err});
            return;
        }
        console.log("8");
        res.render('', {'message': "성공적으로 예매되었습니다.",}); // ejs 경로 채워야함. alert만 띄워주고 초기화면으로 돌아가자
    });
});

module.exports = router;