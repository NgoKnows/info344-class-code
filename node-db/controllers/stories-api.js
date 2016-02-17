'use strict';

const express = require('express');

module.exports.Router = (Story) => {
    const router = express.Router();

    router.get('/stories', (req, res, next) => {
        //return all stories from the db
        Story.getAll()
            .then((rows) => {
                res.json(rows);
            })
            .catch(next)
    });

    router.post('/stories', (req, res, next) => {
        //insert a new story into database and return data with
        //default values applied
        Story.insert(req.body)
            .then((row) => {
                res.json(row)
            })
            .catch(next)
    });

    router.post('/stories/:id/votes', function(req, res, next) {
        Story.upVote(req.params.id)
            .then((row) => {
                res.json(row);
            })
            .catch(next);
    });

    return router;
}