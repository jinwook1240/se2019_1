'use strict';

if(module.exports.connection !== undefined) {
    return;
}
const TAG = "BusDAO";
module.exports.connection = require('../database/mysql.js');

const connection = module.exports.connection;

module.exports.getBusList = (callback) => {
    connection.query('SELECT * FROM jjj.bus', (query_err, query_res, query_fields) => {
        if (query_err) {
            console.log(query_err);
            return;
        }
        callback(query_res, query_fields);
    })
};
module.exports.searchBus = (condition, callback) => {
    let sql = 'SELECT * FROM jjj.bus ';
    if(condition){
        sql+='WHERE ' + condition;
    }
    connection.query(sql, (query_err, query_res, query_fields) => {
        if (query_err) {
            console.log(query_err);
            return;
        }
        callback(query_res);
    });
};
module.exports.createBus = (propDict, callback) => {//GET PROPERTY WITH DICTIONARY
    //bus_code date departure_location arrival_location departure_time arrival_time rate
    let query1 = 'INSERT INTO jjj.bus (bus_code,';
    let query2 = ') VALUES("'+ propDict['date']+propDict['departure_location']+propDict['arrival_location']+propDict['departure_time']+propDict['arrival_time'] +'",';
    let query3 = ');';
    for (let key in propDict) {
        query1 += key+",";
        let tmp;
        if(key!=="rate") tmp = '"'+propDict[key]+'",';
        else tmp = propDict[key]+',';
        query2 += tmp;
    }
    query1 = query1.substring(0,query1.length-1) + query2.substring(0,query2.length-1) + query3;
    console.log(query1);
    connection.query(query1, (query_err, query_res, query_fields) => {
        if (query_err) {
            console.log(query_err);
        }
        callback(query_err, query_res, query_fields);
    })
};