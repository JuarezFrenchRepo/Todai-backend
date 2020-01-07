const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  update,
  remove

};

function find() {
  return db('user_profile').select('id', 'username', 'password', 'email', 'phone');
}

// function findBy(filter) {
//   return db('user_profile').where(filter);
// }

async function add(user) {
  const [id] = await db('user_profile').insert(user);

  return findById(id);
}

function findBy(username) {
  return (
  db('user_profile')
  .where(username)
  .select('id', 'username', 'password', 'email', 'phone')
  // return db('user_profile').select('id', 'username', 'password', 'email', 'phone');
)}

function update(username, changes) {
  return db('users')
    .where({ username })
    .update(changes, '*');
}

function remove(username) {
  return db('user_profile')
    .where({ username })
    .del();
}


