const router = require("express").Router();
const bcrypt = require("bcryptjs");
const knex = require("knex");
const config = require("../knexfile.js");
const jwt = require("jsonwebtoken"); // installed this
const restricted = require("./authenticate-middleware");
const db = knex(config.development);
const Users = require("../users/users-model.js");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(501).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // user.password = hash;
      if (user && bcrypt.compare(password, user.password)) {
        // sign token
        const token = signToken(user); // new line

        // send the token
        res.status(200).json({
          token, // added token as part of the response sent
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// router.get("/users", restricted, (req, res) => {
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.send(err));
// });
// router.get("/users/:username", restricted, (req, res) => {
//   const { username } = req.params;
//   Users.findBy({ username })
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.send(err));
// });

// router.put("/users/:username", restricted, (req, res) => {
//   const { username } = req.params;
//   const changes = req.body;

//   db("user_profile")
//     .where({ username })
//     .update(changes)
//     .then(count => {
//       if (count) {
//         res.json({ update: count });
//       } else {
//         res.status(404).json({
//           message: "Could not find user with that username"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to update user" });
//     });
// });

// router.delete("/users/:username", restricted, (req, res) => {
//   // const {username} = req.params.id;

//   const { username } = req.params;
//   // const changes = req.body;

//   Users.remove({ username })
//     // .update(changes)
//     .then(count => {
//       if (count > 0) {
//         res.status(200).json({ message: "The user has been nuked" });
//       } else {
//         res.status(404).json({ message: "The user could not be found" });
//       }
//     })

//     .catch(err => {
//       res.status(500).json({ message: "Failed to update user" });
//     });
// });

// this functions creates and signs the token
function signToken(user) {
  const payload = {
    username: user.username
    // role: "student", // this will come from the database users.role
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "4h"
  };

  return jwt.sign(payload, secret, options); // notice the return
}

module.exports = router;
