const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.development);
const Values = require("./values-model.js");
const restricted = require("../auth/authenticate-middleware");



// for endpoints beginning with /api/auth

/// GET ///

router.get("/", restricted, (req, res) => {
  values.find()
    .then(values => {
      res.json(values);
    })
    .catch(err => res.send(err));
});

router.get("/values/:value", restricted, (req, res) => {
  const {value} = req.params;
  values.findBy(value)
    .then(values => {
      res.json(values);
    })
    .catch(err => res.send(err));
});

/// PUT ///

router.put("/values/:value", restricted, (req, res) => {
  const { value } = req.params;
  const changes = req.body;

  db("value_profile")
      .where({ value })
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
});

/// DELETE ///

router.delete("/values/:value", restricted,(req, res) => {
  // const {value} = req.params.id;

  const { value } = req.params;
  // const changes = req.body;

  values
      .remove({ value })
      // .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The Value has been nuked" });
        } else {
          res.status(404).json({ message: "The Value could not be found" });
        }
      })
  
      .catch(err => {
          res.status(500).json({ message: "Failed to update value" });
      });
});

/// POST ///

router.post("/", (req, res) => {
    Values.add(req.body)
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

  


module.exports = router;
