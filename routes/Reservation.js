'use strict';

const express = require('express');
const router = express.Router();
const BusDAO = require("../database/BusDAO");
const RsrvDAO = require("../database/ReservationDAO");

router.get('/', (req, res)=> {
    const condition = 'bus_code="'+req.query.bus_code+'"';
    console.log(condition);
    BusDAO.searchBus(condition, (buslist)=>{
        res.render('Bus', {'buslist':buslist, "user_id":req.session.user_id, "user_coin": req.session.user_id});

    });
});

router.get('/list', (req, res)=> {
    if(!req.session.user_id){
        res.redirect("/?message=로그인 후 이용하세요")
    }
    const member_id = req.session['user_id'];
    RsrvDAO.searchReservations(member_id, (err, list)=> {
        if (err) {
            res.render('error',{'message':"예매내역 확인에 실패하였습니다.", 'error':err});
            return;
        }
        /*
        list : list {
            obj : Reservation {
                'date': date,                             // 예매 날짜
                'departure_location': depature_location,  // 출발지
                'arrival_location': arrival_location,     // 도착지
                'departure_time': depature_time,            // 출발 시간
                'arrival_time': arrival_time,               // 도착 시간
                'seats': seats,                             // 좌석들의 배열
                'rate': rate,                              // 요금
            }
            objs...
        }
        */
        res.render('reservationList', {"list": list});
    });
});

module.exports = router;