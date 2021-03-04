const Thought = require("../models/thought.model.js");

// Create and Save a new Thought
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Thought
  const thought = new Thought({
    thought: req.body.thought,
    thinker: req.body.thinker
  });

  // Save Thought in the database
  Thought.create(thought, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Thought."
      });
    else res.send(data);
  });
};

// Retrieve all Thoughts from the database.
exports.findAll = (req, res) => {
  Thought.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving thoughts."
      });
    else res.send(data);
  });
};

// Find a single Thought with a thoughtId
exports.findOne = (req, res) => {
  Thought.findById(req.params.thoughtId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Thought with id ${req.params.thoughtId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Thought with id " + req.params.thoughtId
        });
      }
    } else res.send(data);
  });
};
