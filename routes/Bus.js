'use strict';

const express = require('express');
const router = express.Router();
const BusDAO = require("../database/BusDAO");
const SeatRsrvDAO = require("../database/SeatReservationDAO");

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

router.get('/busDetail', (req, res)=> {
    SeatRsrvDAO.searchSeats(req.query['date'], req.query.dptLoc, 
        req.query.dptTime, req.query.arvTime, (dao_res) => {
            if (!dao_res) alert('SeatReservationDAO.searchSeats Query Error');
            let seats = new Array();
            for (seat in reservedSeats) {
                const num = seat.seat_number;
                seats[num] = new Seat(num, true);
            }
            for (let i = 1; i <= 28; i++) {
                if (seats[i] !== undefined) continue;
                seats[i] = new Seat(i, false);
            }
            res.render('', {'' :Seat.make_seats_display(seats)}); // 채워야 함
        });
});

module.exports = router;
