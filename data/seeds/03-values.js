
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('values').del()
    .then(function () {
      // Inserts seed entries
      return knex('values').insert([
        {id:1,value:'Athletic ability'},
        {id:2,value:'Art and Literature'},
        {id:3,value:'Creativity, discovering or inventing'},
        {id:4,value:'Independence'},
        {id:5,value:'Kindness and generosity'},
        {id:6,value:'Living in the moment' },
        {id:7,value:'Membership in a social group - community, racial group, club, etc'},
        {id:8,value:'Mindfulness'},
        {id:9,value:'Music'},
        {id:10,value:'My community'},
        {id:11,value:'My moral principles'},
        {id:12,value:'Nature and environment'},
        {id:13,value:'Relationships with friends and family'},
        {id:14,value:'Sense of humor'},
        {id:15,value:'Success in career'},
      
      ])
    })
    };

