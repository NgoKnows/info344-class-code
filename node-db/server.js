'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbConfig = require('./secret/config-maria.json');
const bluebird = require('bluebird');

const connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

var storiesApi = require('./controllers/stories-api.js');
const Story = require('./models/story.js').Model(connPool);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));

app.use('/api/v1', storiesApi.Router(Story));

app.listen(80, () => {
    console.log('server is listening...');
})

