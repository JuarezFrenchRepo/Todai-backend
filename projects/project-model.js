const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  addValue,
  findValues


};

function find() {
  // return db('projects').select('id', 'name', 'user_id');
  return db('projects').select('*');
}

// function findBy(filter) {
//   return db('project').where(filter);
// }

async function add(project) {
  const [id] = await db('projects').insert(project);

  return findBy(id);
}

function findBy(id) {
  return db('projects')
  .where(id)
  .select('*')
  // return db('project').select('id', 'project', 'password', 'email', 'phone');
}

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

function findById(id) {
  // console.log('Id in model',id)
  return (
  db("project_values")
  .where({id})
  .first()
  .select('*')
  // return db('user_profile').select('id', 'username', 'password', 'email', 'phone');
)}


/// POST values by user id ///
 
async function addValue(value) {
  const [id] = await db("project_values").insert(value);
return findById(id);
}


/// GET values by id ///


function findValues(id) {
  return db("project_values as pv")
      
      .select("p.name", "v.value")
      .join("projects as p","p.id","pv.project_id")
      .join("values as v", "v.id","pv.value_id")
      .where('pv.project_id', id)
     
      // .orderBy("st.step_number")
      
     
}




