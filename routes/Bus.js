'use strict';

const express = require('express');
const router = express.Router();
const BusDAO = require("../database/BusDAO");
const RsrvDAO = require("../database/ReservationDAO");

router.get('/', (req, res)=> {
    const condition = 'bus_code="'+req.query.date+req.query.dptloc+req.query.arvloc+'"';
    console.log(condition);
    BusDAO.searchBus(condition, (dao_res)=>{
        res.render('Bus', {'buslist':dao_res});
    });
});

router.post('/', (req, res)=> {
    BusDAO.createBus(req.query.props, (err, queryres, fields)=>{
        if(err){
            res.render('error',{'message':"차량 추가에 실패하였습니다.", 'error':err});
            return;
        }
        res.render('Bus', {'buslist':queryres});
    });
});
router.get('/busAdd', (req, res)=>{
    if(!req.query === {}){
        res.render('busAdd',{'alertmessage':undefined, 'script':undefined, "user_id":req.session.user_id});
    }
    else{
        for(let idx = 0;idx < Object.keys(req.query).length ;idx++){
            let key = Object.keys(req.query)[idx];
            if(req.query[key] === ""){
                delete req.query[key];
            }
        }
        BusDAO.createBus(req.query, (q_err, q_res, q_field)=>{
            if(q_err) res.render('busAdd',{'alertmessage':'bus add failed!', 'script':undefined, "user_id":req.session.user_id});
            else res.render('busAdd',{'alertmessage':'bus added successfully!', 'script':'window.location.href="/"', "user_id":req.session.user_id});
        });
    }

});

router.get('/busdetail', (req, res)=> {
    RsrvDAO.searchSeats(req.query.bus_code, (dao_res) => {
            if (!dao_res) return 'ReservationDAO.searchSeats Query Error'; // res.render로 수정 필요
            let seats = new Array();
            for (let i in dao_res) {
                const num = dao_res[i].seat_number
                seats[num] = new Seat(num, true);
            }
            for (let i = 1; i <= 28; i++) {
                if (seats[i] === undefined) seats[i] = new Seat(i, false);
            }
            res.render('', {'' :Seat.make_seats_display(seats)}); // 채워야 함
        });
});

module.exports = router;
