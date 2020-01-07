const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile.js");
const db = knex(config.development);
const restricted = require("../auth/authenticate-middleware");
const Project = require("./project-model.js");

/// GET ///

router.get("/", restricted, (req, res) => {
  Project.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err =>
      res.status(500).json({ message: "Error on the GET project" })
    );
});

router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;
  Project.findBy({ id })
    .then(project => {
      res.json(project);
    })
    .catch(err => res.send(err));
});

/// POST ///

router.post("/", (req, res) => {
  const project = req.body;

  Project.add(project)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log("Error inserting project:", err);
      res.status(500).json({ message: "Failed to create new project" });
    });
});

/// PUT ///

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("projects")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({
          message: "Could not find project"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update project" });
    });
});

/// DELETE ///

router.delete("/:id", restricted, (req, res) => {
  // const {project} = req.params.id;

  const { id } = req.params;
  // const changes = req.body;
  Project.findBy({ id })
    .remove()
    // .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The project has been nuked" });
      } else {
        res.status(404).json({ message: "The project could not be found" });
      }
    })

    .catch(err => {
      res.status(500).json({ message: "Failed to update project" });
    });
});

module.exports = router;
