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
        new MemberDAO(id, pw, name, phone, email).
    }
}