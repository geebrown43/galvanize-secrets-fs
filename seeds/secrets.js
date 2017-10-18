
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('secrets').del()
    .then(function () {
      // Inserts seed entries
      return knex('secrets').insert([
        {id: 1, secret: 'I have had more girlfriends then I have had shoes'},
        {id: 2, secret: 'I dont have many secrets'},
        {id: 3, secret: 'I have had a lot of cars'}
      ]);
    });
};
