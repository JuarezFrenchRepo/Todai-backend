
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_profile').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_profile').insert([
        {id: 1, username: 'Homer', password: 'pass', email:'homer@snpp.com', phone: '541-555-1212' },
      
      ]);
    });
};
