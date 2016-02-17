'use strict';
let connPool;

const Story = {
    getAll() {
        const sql = `select * from stories order by
            votes desc, createdOn desc limit 50`;
        return connPool.queryAsync(sql)
    },

    insert(story) {
        //validate data
        let sql = 'insert into stories (url) values (?)';
        let params = [story.url];

        return connPool.queryAsync(sql, params)
            .then((results) => {
                sql = 'select * from stories where id=?';
                params = [results.insertId];
                return connPool.queryAsync(sql, params);
            })
            .then((rows) => {
                return rows.length > 0 ? rows[0] : null;
            });
    },

    upVote(id) {
        let sql = 'update stories set votes=votes+1 where id=?';
        let params = [id];
        return connPool.queryAsync(sql, params)
            .then((results) => {
                sql = 'select * from stories where id=?'
                return connPool.queryAsync(sql, params);
            })
            .then((rows) => {
                return rows.length > 0 ? rows[0] : null;
            })
    }
};

module.exports.Model = function(connectionPool) {
    connPool = connectionPool;
    return Story;
}