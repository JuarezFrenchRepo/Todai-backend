const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  
  update,
  remove

};

function find() {
  return db('values').select('id', 'valuename', 'password', 'email', 'phone');
}

// function findBy(filter) {
//   return db('values').where(filter);
// }

async function add(value) {
  const [id] = await db('values').insert(value);

  return findById(id);
}


function findBy(value) {
  return (
  db('values')
  .where(value)
  .select('id', 'value', 'description')
  // return db('values').select('id', 'valuename', 'password', 'email', 'phone');
)}

function update(valuename, changes) {
  return db('values')
    .where({ valuename })
    .update(changes, '*');
}

function remove(valuename) {
  return db('values')
    .where({ valuename })
    .del();
}


