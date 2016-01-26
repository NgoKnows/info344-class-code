'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

//app.get('/', (req, res) => {
//    res.setHeader('Content-Type', 'text/plain');
//    res.send('Hello World');
//});
//
//app.get('/time', (req, res) => {
//    res.setHeader('Content-Type', 'text/plain');
//    res.send(new Date());
//});

app.get('/api/v1/users', (req, res) => {
    let users = [
        {
            email: 'test@test.com',
            displayName: 'test user'
        }
    ];

    res.json(users);
});

app.post('/api/v1/users', (req, res) => {
    console.log(req.body);
    res.json({message: 'new user created'});
});

app.listen(80, () => {
    console.log('Server is listening on port 80');
});