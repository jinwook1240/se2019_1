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
    RsrvDAO.searchReservations(member_id, (err, list)=> {
        if (err) {
            res.render('error',{'message':"예매내역 확인에 실패하였습니다.", 'error':err});
            return;
        }
        /*
        list {
            obj : Reservation {
                'user_id': member_id,                       // 회원 id
                'reservations': reservations,               // 예매 횟수
                'dates': dates,                             // 예매 날짜 배열
                'departure_locations': depature_locations,  // 출발지 배열
                'arrival_locations': arrival_locations,     // 도착지 배열
                'departure_time': depature_time,            // 출발 시간의 배열
                'arrival_time': arrival_time,               // 도착 시간의 배열
                'seats': seats,                             // 좌석 배열의 배열
                'rates': rats,                              // 요금 배열
            }
            objs...
        }
        */
        res.render('reservationList', list);
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