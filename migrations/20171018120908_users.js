
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', table => {
          table.increments().primary();
          table.string('username');
          table.string('email');
          table.string('code');
        })
      ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
      ]);
};
