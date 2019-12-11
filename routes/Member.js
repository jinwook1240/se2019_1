'use strict';

const express = require('express');
const router = express.Router();
const MemberDAO = require("../database/MemberDAO");
const sessionDict = {};

router.get('/signIn', (req, res) => { // log in
    console.log("test : "+router.session);
    Member.signIn(req.query.id, req.query.pw, req, res);
});

router.get('/signUp', (req, res) => { // sign up
    Member.signUp(req.query.id, req.query.pw,
        req.query['name'], req.query.phone, req.query.email, res);
});

router.get('/signOut', (req, res) => { // log out
    Member.signOut(res);
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
        if(id===undefined && pw === undefined){
            res.render('signIn', {'loginMessage':undefined});
        }
        else if(id===undefined){
            res.render('signIn', {'loginMessage':"please type id"});
        }
        else if(pw===undefined){
            res.render('signIn', {'loginMessage':"please type pw"});
        }
        else{
            MemberDAO.searchMember(id, pw, (dao_res) => {
                if (dao_res === 0) {
                    res.render('signIn', {'loginMessage':"Something went wrong!!"});
                } else if (dao_res === 1) {
                    res.render('signIn', {'loginMessage':"Input ID doesn't exist!!"});
                } else if (dao_res === 2) {
                    res.render('signIn', {'loginMessage':"Input password is wrong!!"});
                } else {
                    if(!req.session.logined){
                        res.redirect('/');
                    }
                    req.session.logined = true;
                    req.session.user_id=id;
                    res.redirect('/');
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

    static signOut(res) {
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
