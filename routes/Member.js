'use strict';

const express = require('express');
const router = express.Router();
const MemberDAO = require("../database/MemberDAO");
const sessionDict = {};
const CLASSTAG = "Member";
router.get('/signIn', (req, res) => { // log in
    console.log()
    Member.signIn(req.query.id, req.query.pw, req, res);
});

router.get('/signUp', (req, res) => { // sign up
    Member.signUp(req.query.id, req.query.pw,
        req.query['name'], req.query.phone, req.query.email, res);
});

router.get('/signOut', (req, res) => { // log out
    Member.signOut(req, res);
});

router.get('/updateCoin', (req, res) => { // updateCoin
    Member.updateCoin(req.query.id, req.query.coin, res);
});

class Member {
    constructor(id, pw, name, phone, email, coin) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.coin = coin;
    }
    static signIn(id, pw, req, res) {
        let message = {"user_id":req.session.user_id};
        const FUNCTIONTAG = "signIn";
        if(id===undefined && pw === undefined){
            message['loginMessage'] = undefined;
            res.render('signIn', message);
        }
        else if(id===""){
            DEBUG_LOG(FUNCTIONTAG, "id undefined");
            message['loginMessage'] = "please type id";
            res.render('signIn', message);
        }
        else if(pw===""){
            DEBUG_LOG(FUNCTIONTAG, "password undefined");
            message['loginMessage'] = "please type pw";
            res.render('signIn', message);
        }
        else{
            MemberDAO.searchMember(id, pw, (dao_res) => {
                if (dao_res === 0) {
                  message['loginMessage'] = "Something went wrong!!";
                    DEBUG_LOG(FUNCTIONTAG, "Something went wrong!!");
                    res.render('signIn', message);
                } else if (dao_res === 1) {
                  message['loginMessage'] = "Input ID doesn't exist!!";
                    DEBUG_LOG(FUNCTIONTAG, "Input ID doesn't exist!!");
                    res.render('signIn', message);
                } else if (dao_res === 2) {
                  message['loginMessage'] = "Input password is wrong!!";
                    DEBUG_LOG(FUNCTIONTAG, "Input password is wrong!!");
                    res.render('signIn', message);
                } else {
                    if(req.session.user_id){
                        DEBUG_LOG(FUNCTIONTAG, "currently logined");
                        res.redirect('/');
                    }else{
                        DEBUG_LOG(FUNCTIONTAG, "login success! : "+id);
                        req.session.user_id=id;
                        res.redirect('/');
                    }
                }
            });
        }
    }

    static signUp(id, pw, name, phone, email, res) {
        MemberDAO.insertMember(id, pw, name, phone, email, (dao_res) => {
            if (dao_res) res.redirect('/');
            else res.render('signUp', {'signupMessage':""});
        });
    }

    static signOut(req, res) {
        req.session.user_id=undefined;
        req.session.destroy();
        res.clearCookie('sid');
        res.render('signOut', {});
    }

    static updateCoin(id, coin, res) {
        if (coin < 0) alert('Error');
        else {
            MemberDAO.updateCoin(id, coin, (dao_res) => {
                if (dao_res) res.render('UpdateCoin', {'id' : id, 'coin':coin});
                else alert('Error');
            });
        }
    }
}

module.exports = router;
module.exports.sessions = sessionDict;

function DEBUG_LOG(functionTag, str){
    console.log(CLASSTAG+"."+functionTag+" : "+str);
}