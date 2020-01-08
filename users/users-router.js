const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.development);
const restricted = require("../auth/authenticate-middleware");
const Users = require("./users-model.js");

/// GET ///

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json({ message: "Error on the GET users" }));
});

router.get("/:username", restricted, (req, res) => {
  const { username } = req.params;
  Users.findBy({ username })
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});
router.get("/:id", restricted, (req, res) => {
  const { id }  = req.params;
  Users.findBy({ id })
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

/// PUT ///

router.put("/:username", restricted, (req, res) => {
  const {username} = req.params;
  const changes = req.body;

  // 
  Users
    .update(username, changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({
          message: "Could not find user with that username"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

/// DELETE ///

router.delete('/:username', (req, res) => {
  const username = req.params
  db('user_profile')
    .where({username})
    .del()
  .then(count => {
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

router.get('/:id/projects', (req, res) => {
  const {id} = req.params;

  Users.findProjects(id)
  .then(projects => {
    if (projects) {
      res.json(projects);
    } else {
      res.status(404).json({ message: 'Could not find projects for given id' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});







module.exports = router;
