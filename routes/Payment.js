'use strict';

const express = require('express');
const router = express.Router();
const RsrvDAO = require("../database/ReservationDAO");
const MemberDAO = require("../database/MemberDAO");
const BusDAO = require("../database/BusDAO");

router.get('/', (req, res)=> {
    if(!req.session.user_id){
        res.redirect("/?message=로그인 후 이용하세요")
    }
    res.render('payment',{"user_id":req.session.user_id,
        'bus':req.query.bus,
        'seat': req.query.seat_list,
        'user_coin':req.session.user_coin
    });
});
router.get('/confirm', (req, res)=> {
    if(!req.session.user_id){
        res.redirect("/?message=로그인 후 이용하세요")
    }
    console.log("payment confirm : "+JSON.stringify(req.query));
    const bus_code = req.query['bus_code'];
    const member_id = req.session.user_id;
    const seats = JSON.parse(req.query.seat_sel);
    MemberDAO.getCoin(req.session.user_id, (member_res)=>{
        BusDAO.searchBus('bus_code="'+bus_code+'"', (bus_res)=>{
            if(member_res<bus_res[0].rate*seats.length){
                res.redirect('/?message=코인이 부족합니다.');
                return;
            }
            RsrvDAO.reserveSeats(bus_code, member_id, seats, (err)=> {
                if (err) {
                    console.log("err");
                    res.render('error',{'message':"좌석 예매에 실패하였습니다.", 'error':err});
                    return;
                }
                res.redirect('/?message=성공적으로 예매되었습니다.');
            });
        });
    });
});


module.exports = router;
