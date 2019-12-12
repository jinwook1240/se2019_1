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
            let bus_codes = [query_res[0]['bus_code']];
            let seats = new Array();
            let size = 1;
            let seat_nums = [query_res[0]['seat_number']];
            const len = query_res.length;
            for (let i = 1; i < len; i++) {
                const bus_code = query_res[i]['bus_code'];
                if (bus_codes[size] != bus_code) {
                    seats.push(seat_nums)
                    seat_nums = new Array();
                    bus_codes.push(bus_code);
                    size++;
                }
                seat_nums.push(query_res[i]['seat_number']);
            }
            seats.push(seat_nums);
            callback(null, bus_codes, seats);
        });
    }

    static tempCallback(err, res, callback) {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }
        else console.log("tempCallback success");
    }

    static reserveSeats(bus_code, member_id, seats, callback) {
        let sql = 'start transaction;'
        conn.query(sql, (query_err, query_res, query_fields) => {
            ReservationDAO.tempCallback(query_err, query_res, callback);
        });
        sql = 'insert into reservation values('
            +'"' + bus_code+member_id + '", '
            +'"' + bus_code + '", '
            +'"' + member_id + '");';
        conn.query(sql, (query_err, query_res, query_fields) => {
            ReservationDAO.tempCallback(query_err, query_res, callback);
        });
        for (let i in seats) {
            sql = 'insert into reservation_seats values('
            +'"' + bus_code + '", '
            +'' + seats[i] + ');';
            conn.query(sql, (query_err, query_res, query_fields) => {
                ReservationDAO.tempCallback(query_err, query_res, callback);
            });
        }
        sql = "commit;"
        conn.query(sql, (query_err, query_res, query_fields) => {
            if (query_err) callback(query_err);
            else callback(null);
        });
    }
}

module.exports.searchSeats = ReservationDAO.searchSeats;
module.exports.searchReservations = ReservationDAO.searchReservations;
module.exports.reserveSeats = ReservationDAO.reserveSeats;