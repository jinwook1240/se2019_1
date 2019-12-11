'use strict'

if (module.exports.connection !== undefined) return;

module.exports.connection = require('../database/mysql.js');
const conn = module.exports.connection;


class ReservationDAO {
    static searchSeats(bus_code, callback) {
        const sql = 
            'SELECT seat_number '
            +'FROM reservation_seats'
            +'where bus_code = "' + bus_code + '" '
            +'order by seat_number';
        conn.query(sql, (query_err, query_res, query_fields) => {
            let ret;
            if (query_err) ret =  0; // error
            else ret = query_res;
            console.log(ret);
            // callback(ret);
        });
    }

    static searchReservations(member_id, callback) {
        const sql = 
            'select member_id, rsrv.bus_code, seat_number '
            +'from reservation as rsrv, reservation_seats as seats '
            +'where rsrv.member_id="' + member_id + '" '
            +'and rsrv.bus_code = seats.bus_code';
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err) { // error
                callback(query_err, null, null);
                return;
            }
            const bus_code = query_res[0]['bus_code'];
            let seat_nums = new Array();
            for (let i in query_res) {
                seat_nums.push(query_res[i]['seat_number']);
            }
            callback(null, bus_code, seat_nums);
        });
    }

    static reserveSeats(bus_code, member_id, seats, callback) {
        console.log("2");
        tempCallback = (err, res) => {return (err) ? err : res;}
        let sql = 'start transaction;'
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err) tempCallback(query_err, null);
            else tempCallback(null, query_res);
        });
        console.log("3");
        sql = 'insert into reservation values('
            +'"' + bus_code+member_id + '", '
            +'"' + bus_code + '", '
            +'"' + member_id + '");';
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err) tempCallback(query_err, null);
            else tempCallback(null, query_res);
        });
        console.log("4");
        for (let i in seats) {
            sql = 'insert into reservation_seats values('
            +'"' + bus_code + '", '
            +'' + seats[i] + ');';
            conn.query(sql, (query_err, query_res, query_fields) => {
                if (query_err) tempCallback(query_err, null);
                else tempCallback(null, query_res);
            });
        }
        console.log("5");
        sql = "commit;"
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err) callback(query_err);
            else callback(null);
        });
        console.log("6");
    }
}

module.exports.searchSeats = ReservationDAO.searchSeats;
module.exports.searchReservations = ReservationDAO.searchReservations;
module.exports.reserveSeats = ReservationDAO.reserveSeats;