const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  update,
  remove

};

function find() {
  return db('values').select('id', 'value');
}

// function findBy(filter) {
//   return db('values').where(filter);
// }

async function add(value) {
  const [id] = await db("values").insert(value);

  return findById(id);
}

function findBy(id) {
  return (
  db('values')
    .where(id)
    .select("id", "value", "top_pick", "value_basis")
  // return db('values').select('id', 'valuename', 'password', 'email', 'phone');
)}

function update(id, changes) {
  return db("values")
    .where({ id})
    .update(changes, "*");
}

function remove(id) {
  return db("values")
    .where({id})
    .del();
}
