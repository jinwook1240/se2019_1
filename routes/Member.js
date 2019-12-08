const express = require('express');
const router = express.Router();

class Member {
    constructor(id, pw, name, phone, email, coin) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.coin = coin;
    }

    signIn(id, pw) {
        checkId = MemberDAO.searchMember(id, pw);

    }

    signUp(id, pw, name, phone, email) {
        
    }
}

module.exports = router;