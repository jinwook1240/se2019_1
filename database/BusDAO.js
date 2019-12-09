'use strict';
const TAG = "database/BusDAO";
if(module.exports.connection === undefined){
    module.exports.connection = require('../database/mysql.js');
    module.exports.connection.connect();
}
let connection = module.exports.connection;
module.exports.getBusList= (callback)=>{
    connection.query('SELECT * FROM bus', (query_err, query_res, query_fields)=>{
        if(query_err){
            console.log(query_err);
            return;
        }
        callback(query_res, query_fields);
    })
};
module.exports.searchBus= (condition, callback)=>{
    connection.query('SELECT * FROM Bus WHERE '+condition, (query_err, query_res, query_fields)=>{
        if(query_err){
            console.log(query_err);
            return;
        }
        callback(query_res, query_fields);
    });
};
module.exports.createBus= (propDict, callback)=>{//GET PROPERTY WITH DICTIONARY
    let query1 = 'transaction;' +
        'INSERT INTO Bus (';
    let query2 = ') VALUES(';
    let query3 = ');' +
        'commit;';
    for(let key in propDict){
        query1+=key;
        query2+=propDict[key];
    }
    query1 = query1+query2+query3;
    connection.query(query1, (query_err, query_res, query_fields)=>{
        if(query_err){
            console.log(query_err);
        }
        callback(query_err, query_res, query_fields);
    })
};



