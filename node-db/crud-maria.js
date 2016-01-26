'use strict';

const mysql = require('mysql');
const bluebird = require('bluebird')
const dbConfig = require('./secret/config-maria.json')

const conn = bluebird.promisifyAll(mysql.createConnection(dbConfig));

let id;

function logRow(row) {
    console.log(row);
}

function logRows(rows) {
    rows.forEach(logRow)
}

conn.queryAsync('insert into stories (url) values (?)', ['http://google.com'])
    .then((results) => {
        console.log('row inserted, new id = %s', results.insertId);
        id = results.insertId;
        return conn.queryAsync('select * from stories where id=?', [results.insertId]);
    })
    .then(logRows)
    .then(() => {
        return conn.queryAsync('update stories set votes=votes+1 where id=?', [id]);
    })
    .then((results) => {
        console.log('%d rows affected', results.affectedRows);
        return conn.queryAsync('select * from stories where id=?', [id]);
    })
    .then(logRows)
    .then(() => {
        return conn.queryAsync('delete from stories where id=?', [id]);
    })
    .then(() => {
        console.log('%d rows affected', results.affectedRows);
    })
    .then(() => {
        conn.end();
    })
    .catch((err) => {
        console.error(err);
        conn.end();
    });
