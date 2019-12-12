'use strict'

if (module.exports.connection !== undefined) return;

module.exports.connection = require('../database/mysql.js');
const conn = module.exports.connection;

class Reservation {
    constructor(obj) {
        this.bus_code = obj['bus_code'];
        this.date = obj['date'];
        this.departure_location = obj['departure_location'];
        this.arrival_location = obj['arrival_location'];
        this.departure_time = obj['departure_time'];
        this.arrival_time = obj['arrival_time'];
        this.rate = obj['rate'];
        this.seats = [obj['seat_number']]; // list라는 것에 유의
    }
};

function errorHandlingCallback(err, callback) {
    if (err) {
        console.log(err);
        callback(err);
        return;
    }
    else console.log("errorHandlingCallback success");
}

class ReservationDAO {
    static searchSeats(bus_code, callback) {
        const sql = 
            'SELECT seat_number '
            +' FROM jjj.reservation_seats'
            +' where bus_code = "' + bus_code + '" '
            +' order by seat_number';
        //console.log("sql : ",sql);
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err) {
                callback(query_err, null);
                return;
            }
            //console.log(query_res);
            callback(null, query_res);
        });
    }

    static searchReservations(member_id, callback) {
        console.log("member_id: ", member_id);
        let sql = 
            'select bus_code, date, departure_location, arrival_location, '
            +'departure_time, arrival_time, rate, seat_number '
            +'from bus natural join ('
            +'select rsrv.bus_code, seat_number '
            +'from reservation as rsrv, reservation_seats as seats '
            +'where rsrv.member_id="' + member_id + '" '
            +'and rsrv.bus_code = seats.bus_code '
            +') as k '
            +'order by date desc, departure_time desc, arrival_time desc';
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err) { // error
                console.log(query_err);
                callback(query_err, null);
                return;
            }
            const len = query_res.length;
            if (len == 0) {
                callback(null, list);
                return;
            }
            const list = new Array();
            let reservation = new Reservation(query_res[0]);
            let curr_bus_code = reservation['bus_code'];
            let seats = reservation['seats'];
            let push_flag = true;
            for (let i = 1; i < len; i++) {
                const obj = query_res[i];
                if (curr_bus_code == obj['bus_code']) { // 같은 버스면 좌석 추가
                    seats.push(obj['seat_number']);
                    push_flag = true;
                } else { // 다른 버스면 예약을 리스트에 추가
                    list.push(reservation);
                    reservation = new Reservation(obj);
                    seats = reservation['seats'];
                    push_flag = false;
                }
            }
            if (push_flag) list.push(reservation);
            callback(null, list);
        });
    }

    static reserveSeats(bus_code, member_id, seats, callback) {
        let sql = 'start transaction;'
        conn.query(sql, (query_err, query_res, query_fields) => {
            errorHandlingCallback(query_err, callback);
        });
        sql = 'select count(*) as cnt from reservation '
            +'where reservation_code = "' + bus_code+member_id + '"'
        conn.query(sql, (query_err, query_res, query_fields) => {
            errorHandlingCallback(query_err, callback);
            const cnt = query_res[0]['cnt'];
            if (cnt) return;
            sql = 'insert into reservation values('
            +'"' + bus_code+member_id + '", '
            +'"' + bus_code + '", '
            +'"' + member_id + '");';
            conn.query(sql, (query_err, query_res, query_fields) => {
                errorHandlingCallback(query_err, callback);
            });
        });
        for (let i in seats) {
            sql = 'insert into reservation_seats values('
            +'"' + bus_code + '", '
            +'' + seats[i] + ');';
            conn.query(sql, (query_err, query_res, query_fields) => {
                errorHandlingCallback(query_err, callback);
            });
        }
        // pay 부분 확인 필요
        sql = 'select rate from bus where bus_code = "' + bus_code + '"';
        conn.query(sql, (query_err, query_res, query_fields) => {
            const size = seats.length;
            errorHandlingCallback(query_err, callback)
            const rate = query_res[0]['rate'];
            const pay = rate * size;
            sql = 'update jjj.member set coin = coin - ' + pay +' where member_id = "' + member_id +'"';
            conn.query(sql, (query_err, query_res, query_fields) => {
                errorHandlingCallback(query_err, callback);
            });
            sql = 'update bus set empty_seats = empty_seats - ' + size +' where bus_code = "' + bus_code +'"';
            conn.query(sql, (query_err, query_res, query_fields) => {
                errorHandlingCallback(query_err, callback);
            });
        });
        sql = "commit;";
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err) callback(query_err);
            else callback(null);
        });
    }
}

module.exports.searchSeats = ReservationDAO.searchSeats;
module.exports.searchReservations = ReservationDAO.searchReservations;
module.exports.reserveSeats = ReservationDAO.reserveSeats;