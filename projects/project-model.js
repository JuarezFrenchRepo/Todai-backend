const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  update,
  remove

};

function find() {
  return db('project').select('id', 'project', 'value_basis', 'top_pick');
}

// function findBy(filter) {
//   return db('project').where(filter);
// }

async function add(project) {
  const [id] = await db('project').insert(project);

  return findById(id);
}

function findBy(project) {
  return (
  db('projects')
  .where(project)
  .select('id', 'project', 'description')
  // return db('project').select('id', 'project', 'password', 'email', 'phone');
)}

function update(project, changes) {
  return db('projects')
    .where({ project })
    .update(changes, '*');
}

function remove(project) {
  return db('project')
    .where({ project })
    .del();
}


