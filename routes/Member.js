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

    static signIn(id, pw) {
        MemberDAO.searchMember(id, pw, function(res) {
            if (res == 0) {
                alert('Error');
            } else if (res == 1) {
                alert("Input ID doesn't exist");
            } else if (res == 2) {
                alert("Input password is wrong")
            } else {
                
            }
        });
    }

    signUp(id, pw, name, phone, email) {
        MemberDAO.insertMember(id, pw, function(res) {
            if (res) alert("Sign Up is completed");
            else alert('Error');
        });
    }
}

module.exports = router;