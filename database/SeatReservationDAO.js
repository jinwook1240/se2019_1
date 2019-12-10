'use strict'

if (module.exports.connection !== undefined) return;

module.exports.connection = require('../database/mysql.js');
const conn = module.exports.connection;


class SeatReservationDAO {
    static searchSeats(date, dptLoc, arvLoc, dptTime, arvTime, callback) {
        const bus_code = date+dptLoc+arvLoc+dptTime+arvTime;
        const sql = 'SELECT * FROM seat_reservation where bus_code = "' + bus_code 
            + '" order by seat_number';
        conn.query(sql, (query_err, query_res, query_fields) => {
            let ret;
            if (query_err) ret =  0; // error
            else ret = query_res;
            callback(ret);
        });
    }
}
module.exports.searchSeats = SeatReservationDAO.searchSeats;