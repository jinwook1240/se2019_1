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
    res.render('busAdd',{});
});

router.get('/busDetail', (req, res)=> {
    RsrvDAO.searchSeats(req.query.bus_code, (dao_res) => {
            if (!dao_res) alert('ReservationDAO.searchSeats Query Error');
            const len = dao_res.length;
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
