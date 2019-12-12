'use strict';

const express = require('express');
const router = express.Router();
const BusDAO = require("../database/BusDAO");

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

router.get('/detail', (req, res)=> {
    BusDAO.searchBus('bus_code="'+req.query.bus_code+'"', (dao_res)=>{
        res.render('busDetail', { // 좌석 뽑아낼 ejs 입력
            'bus_code': req.query.bus_code,
            'row' : JSON.stringify(dao_res[0]),
            "user_id":req.session.user_id
        });
    });
});

module.exports = router;
