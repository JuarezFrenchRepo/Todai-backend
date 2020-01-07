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

function findBy(value) {
  return (
  db('values')
    .where(value)
    .select("id", "value", "top_pick", "value_basis")
  // return db('values').select('id', 'valuename', 'password', 'email', 'phone');
)}

function update(value, changes) {
  return db("values")
    .where({ value})
    .update(changes, "*");
}

function remove(value) {
  return db("values")
    .where({ values})
    .del();
}
