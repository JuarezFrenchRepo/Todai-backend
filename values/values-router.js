const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.development);
const restricted = require("../auth/authenticate-middleware");
const Values = require("./values-model.js");

/// GET ///

router.get("/", restricted, (req, res) => {
  Values.find()
    .then(values => {
      res.json(values);
    })
    .catch(err => res.status(500).json({ message: "Unable to GET values" }));
});

router.get(
  "/:id",
  restricted,
  (req, res) => {
    const { value } = req.params;
    Values.findBy(value)
      .then(values => {
        res.json(values);
      })
      .catch(err => {
        res.status(500).json({ message: "Error on the GET values by value" });
      });
  },

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
);

/// DELETE ///

router.delete("/:id", restricted, (req, res) => {
  // const {value} = req.params.id;

  const { id } = req.params;
  // const changes = req.body;

  Values.remove({ id })
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
