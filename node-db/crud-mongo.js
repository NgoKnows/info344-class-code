'use strict';

const mongoose = require('mongoose');
const dbConfig = require('./secret/config-mongo.json')

const storySchema = new mongoose.Schema({
    url: String,
    votes: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Story = mongoose.model('Story', storySchema);

mongoose.connect(dbConfig.url);
mongoose.connection.on('error', (err) => {
    console.error(err);
});

const newStory = {
    url: 'http://www.google.com'
};

let id;
Story.create(newStory)
    .then((story) => {
        id = story._id;
        console.log('inserted new story!');
        console.log(story);
    })
    .then(() => {
        return Story.findById(id).exec();
    })
    .then((story) => {
        console.log('found story!');
        console.log(story);

        return Story.findByIdAndUpdate(id, {$inc: {votes: 1}}, {new: true});
    })
    .then((story) => {
        console.log('updated story!');
        console.log(story);

        return Story.findByIdAndRemove(id);
    })
    .then(() => {
        console.log('story deleted');
    })
    .then(null, () => {
        console.error(err);
    })
    .then(() => {
        mongoose.connection.close();
    })
