'use strict'

const express = require('express');
const router = express.Router();
const MemberDAO = require('../database/MemberDAO');

router.get('/', (req, res)=> {
    if(!req.session.user_id){
        res.redirect("/?message=로그인 후 이용하세요")
    }
    if(req.session.user_id!=="admin"){
        res.render('error', {"message" : "관리자 권한이 필요합니다."});
    }
    let condition = '';
    let beforecondition = false;
    if(req.query.id && req.query.id !== ""){
        condition = 'member_id="'+req.query.id+'"';
        beforecondition = true;
    }
    if(req.query.name && req.query.name !== ""){
        if(beforecondition){
            condition+= " and"
        }
        condition+=' name="'+req.query.name+'"';
        beforecondition = true;
    }
    if(req.query.phone && req.query.phone !== ""){
        if(beforecondition){
            condition+= " and"
        }
        condition+=' phone="'+req.query.phone+'"';
        beforecondition = true;
    }
    if(req.query.email && req.query.email !== ""){
        if(beforecondition){
            condition+= " and"
        }
        condition+=' email="'+req.query.email+'"';
        beforecondition = true;
    }
    MemberDAO.searchMember(condition, (dao_res)=>{
        res.render('memberList', {'memberlist':dao_res});
    });
});

module.exports = router;