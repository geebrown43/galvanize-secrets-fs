
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'gavdaddy', email: 'gavin@prac.com', code: 'abcd'},
        {id: 2, username: 'scoop', email: 'brown@prac.com',code: 'cdfg'},
        {id: 3, username: 'scareb15', email: 'ellis@prac.com', code: 'zfhj'}
      ]);
    });
};
