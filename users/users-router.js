const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.development);
const restricted = require("../auth/authenticate-middleware");
const Users = require("./users-model.js");

/// GET ///

router.get("/", restricted, (req, res) => {
  const { username } = req.query;
  const query = Users.find();

  if (username) {
    query.where({ username });
  }
  query
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json({ message: "Error on the GET users" }));
});

// router.get("/", restricted, (req, res) => {
//   const {id} =req.query
//   const query = Users.find();

//   if (id){
//     query.where({id})
//   }
//     query.then(users => {
//       res.json(users);
//     })
//     .catch(err => res.status(500).json({ message: "Error on the GET users" }));
// });

// router.get("/:username", restricted, (req, res) => {
//   // console.log('Id in router 19',id)
//   const { username } = req.params;
//   Users.findBy({ username })
//     .then(users => {
//       if (users) {
//         res.json(users);
//       } else {
//         res.status(404).json({ message: "Could not find user with given id." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to get user" });
//     });
// });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)

    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

/// PUT ///

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("values")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({
          message: "Could not find that value"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update value" });
    });
})


/// DELETE ///

router.delete("/:username", (req, res) => {
  const username = req.params;
  Users.remove(username)
    .then(count => {
      if (count > 0) {
        res.status(204).json({ message: "The user has been nuked" });
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id/projects", (req, res) => {
  const { id } = req.params;

  Users.findProjects(id)
    .then(projects => {
      if (projects) {
        res.json(projects);
      } else {
        res
          .status(404)
          .json({ message: "Could not find projects for given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get projects" });
    });
});

/// POST values by id ///

router.post("/values", (req, res) => {
  const value = req.body;
  Users.addValue(value)
    .then(value => {
      res.status(201).json(value);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the value"
      });
    });
});

/// GET values by user id ///

router.get("/:id/values", (req, res) => {
  const { id } = req.params;

  Users.findValues(id)
    .then(values => {
      if (values) {
        res.json(values);
      } else {
        res.status(404).json({ message: "Could not find values for given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get values" });
    });
});

/// POST values by user ///

router.post("/values", (req, res) => {
  const value = req.body
  Users.addValue(value)
    .then(value => {
      json(value);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the value"
      });
    });
});

/// PUT values by user///

router.put("/:id/uservalues", restricted, (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  Users.updateValues(id, changes)
  .then(value => {
    res.status(200).json(value);
  })
  .catch(error => {
    // log error to database
    console.error(error);
    res.status(500).json({
      message: "Error updating the value"
    });
  });
});




module.exports = router;
