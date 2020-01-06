
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Build week app', description: "Make Todai a winner."},
        {id: 2, name: 'Plan Valentines Day dinner', description: "Plan a romantic or group dinner - decide."},
        {id: 3, name: 'Watch NCAA football championship',description: "Watch the championship and get all the requisites."},
      ]);
    });
};
