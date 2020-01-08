
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('values').del()
    .then(function () {
      // Inserts seed entries
      return knex('values').insert([
        {id:1,value:'Athletics'},
        {id:2,value:'Art'},
        {id:3,value:'Career'},
        {id:4,value:'Community'},
        {id:5,value:'Connection'},
        {id:6,value:'Creativity' },
        {id:7,value:'Education'},
        {id:8,value:'Generosity'},
        {id:9,value:'Gratitude'},
        {id:10,value:'Family'},
        {id:11,value:'Health'},
        {id:12,value:'Impact'},
        {id:13,value:'Independence'},
        {id:14,value:'Kindness'},
        {id:15,value:'Leadership'},
        {id:16,value:'Mindfulness'},
        {id:17,value:'Music'},
        {id:18,value:'Nature'},
        {id:19,value:'Spirituality'},
        {id:20,value:'Wealth'}
      
      ])
    })
    };

