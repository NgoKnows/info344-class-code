"use strict"

function add2(value) {
    return new Promise((resolve, reject) => {
          resolve(value);
        })
    .then((value) => {
        return value + 1;
    })
    .then((value) => {
        return value + 1;
    })
    .then((value) => {
        console.log(value)
    })
}

add2(0);

var http = require('http');

function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual request stuff
        http.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                resolve(body);
            });
        }).on('error', function(err) {
            reject(err);
        });
    });
}

function getMovie(movieId) {
    get(`http://www.omdbapi.com/?i=${movieId}&plot=short&r=json`)
        .then((value) => {
            console.log(JSON.parse(value))
        })
        .catch((err) => {
            console.error(err);
        })
}

getMovie('tt0120737');

function get3Movies()
