const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  findProjects,
  findValues,
  addValue,
  updateValues


};

function find() {
  return db('user_profile').select('*');
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
  .first()
  .select('*')
  // return db('user_profile').select('id', 'username', 'password', 'email', 'phone');
)}

function findById(id) {
  // console.log('Id in model',id)
  return (
  db("user_profile")
  .where({id})
  .first()
  .select('*')
  // return db('user_profile').select('id', 'username', 'password', 'email', 'phone');
)}



function update(username, changes) {
  return db('user_profile')
    .where({ username })
    .update(changes, '*');
}

function remove(username) {
  return db('user_profile')
    .where({ username })
    .del();
}
// function findProjects(id) {
//   return db("schemes as sc")
//       .select("sc.scheme_name", "st.step_number", "st.instructions")
//       .join("steps as st", "st.scheme_id"," sc.id")
//       .orderBy("st.step_number")
//       .where("sc.id", id)
     
// }

function findProjects(id) {
  return db("user_profile as u")
      .select("u.username", "p.name")
      .join("projects as p", "p.user_id","u.id")
      // .orderBy("st.step_number")
      .where("u.id", id)
     
}

/// POST values by user id ///
 
async function addValue(value) {
  const [id] = await db("user_values").insert(value);
return findById(id);
}


/// GET values by id ///


function findValues(id) {
  return db("user_values as uv")
      
      .select("uv.id","u.username", "v.value","uv.*")
      .join("user_profile as u","u.id","uv.user_id")
      .join("values as v", "v.id","uv.value_id")
      .where('uv.user_id', id)
     
      // .orderBy("st.step_number")
}  
     
/// PUT values by user id ///

function updateValues(id,changes) {
  return db("user_values")
    .where({id})
    .update(changes, '*');
}


