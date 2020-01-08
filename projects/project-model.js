const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  update,
  remove,


};

function find() {
  return db('projects').select('id', 'name', 'user_id');
}

// function findBy(filter) {
//   return db('project').where(filter);
// }

async function add(project) {
  const [id] = await db('projects').insert(project);

  return findById(id);
}

function findBy(id) {
  return (
  db('projects')
  .where(id)
  .select('id', 'name')
  // return db('project').select('id', 'project', 'password', 'email', 'phone');
)}

function update(id, changes) {
  return db('projects')
    .where({ id })
    .update(changes, '*');
}

function remove(id) {
  return db('projects')
    .where({ id })
    .del();
}



