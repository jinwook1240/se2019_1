'use strict';

const express = require('express');
const router = express.Router();
const MemberDAO = require("../database/MemberDAO");

router.get('/signIn', (req, res) => { // log in
<<<<<<< HEAD
    Member.signIn(req.query.id, req.query.pw, res);
});

router.get('/signUp', (req, res) => { // sign up
    Member.signUp(req.query.id, req.query.pw, 
        req.query['name'], req.query.phone, req.query.email, res);
=======
    Member.signIn(req.param('id'), req.param('pw'), res);
});

router.get('/signUp', (req, res) => { // sign up
    Member.signUp(req.param('id'), req.param('pw'), 
        req.param('name'), req.param('phone'), req.param('email'), res);
>>>>>>> 6f1f18a00e3e8b44f2ffab8fdf0f82aa46fc463b
});

router.get('/signOut', (req, res) => { // log out
    Member.signOut(res);
});

router.get('/updateCoin', (req, res) => { // updateCoin
<<<<<<< HEAD
    Member.updateCoin(req.query.id, req.query.coin, res);
=======
    Member.updateCoin(req.param('id'), req.param('coin'), res);
>>>>>>> 6f1f18a00e3e8b44f2ffab8fdf0f82aa46fc463b
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

    static signIn(id, pw, res) {
        MemberDAO.searchMember(id, pw, (dao_res) => {
            if (dao_res == 0) {
                alert('Error');
            } else if (dao_res == 1) {
                alert("Input ID doesn't exist");
            } else if (dao_res == 2) {
                alert("Input password is wrong")
            } else {
                res.render('SignIn', {'member':dao_res});
            }
        });
    }

    static signUp(id, pw, name, phone, email, res) {
        MemberDAO.insertMember(id, pw, name, phone, email, (dao_res) => {
            if (dao_res) alert("Sign Up is completed");
            else alert('Error');
        });
    }

    static signOut(res) {
        res.render('SignOut', {});
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