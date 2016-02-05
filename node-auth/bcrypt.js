'use strict';

const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcrypt'));

let password = process.argv[2];
let rounds = 10;

if (process.argv.length >= 4) {
    rounds = parseInt(process.argv[3]);
    if (isNaN(rounds)) {
        console.error('number of rounds must be an integer!');
        process.exit(1);
    }
}

console.log("hashing '%s' with %d rounds of bcrypt....", password, rounds)
console.time('duration')

bcrypt.hashAsync(password, rounds)
    .then((hash) => {
        console.timeEnd('duration');
        console.log(hash);

        return [hash, bcrypt.compareAsync(password, hash)];
    })
    .spread((hash, isSame) => {
        console.log("comparing hash against '%s': %j", password, isSame);
        password += 'x';
        return [hash, bcrypt.compareAsync(password, hash)];
    })
    .spread((hash, isSame) => {
        console.log("comparing hash against '%s': %j", password, isSame);
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })