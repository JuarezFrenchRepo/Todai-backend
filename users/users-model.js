const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,

};

function find() {
  return db('user_profile').select('id', 'username', 'password', 'email', 'phone');
}

function findBy(filter) {
  return db('user_profile').where(filter);
}

async function add(user) {
  const [id] = await db('user_profile').insert(user);

  return findById(id);
}

function findById(id) {
  return db('user_profile')
    .where({ id })
    .first();
}

