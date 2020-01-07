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

/// PUT ///

router.put("/:username", restricted, (req, res) => {
  const { username } = req.params;
  const changes = req.body;

  db("user_profile")
    .where({ username })
    .update(changes)
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

router.delete("/:username", restricted, (req, res) => {
  // const {username} = req.params.id;

  const { username } = req.params;
  // const changes = req.body;
  Users
  .findBy({ username })
    .remove()
    // .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The user has been nuked" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })

    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

module.exports = router;
