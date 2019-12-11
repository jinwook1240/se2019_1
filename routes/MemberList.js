'use strict'

const express = require('express');
const router = express.Router();
const MemberDAO = require('../database/MemberDAO');

router.get('/', (req, res)=> {
    let condition = "";
    if (req.query.condition) {
        condition = req.query.condition;
    }
    MemberDAO.searchMember(condition, (dao_res)=>{
        res.render('memberList', {'memberlist':dao_res});
    });
});

module.exports = router;