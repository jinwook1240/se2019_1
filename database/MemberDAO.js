const db_connection = require('mysql.js');
db_connection.connect();

class MemberDAO {
    static searchMember(id, pw) {

        return null;
    }

    static checkMember(id) {
        return true;
    };

    static insertMember(id, pw, name, phone, email) {
        return true;
    }

    static updateCoin(id, coin) {
        return true;
    }
}