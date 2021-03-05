const Comment = require("../models/comment.model.js");

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Comment
  const comment = new Comment({
    comment: req.body.comment,
    name: req.body.name,
    thoughtID: req.body.thoughtID
  });

  // Save Comment in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    else res.send(data);
  });
};

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
  Comment.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    else res.send(data);
  });
};

// Find all comments with specific thoughtId
exports.findOne = (req, res) => {
  Comment.findById(req.params.thoughtId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found comments with id ${req.params.thoughtId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving comments with id " + req.params.thoughtId
        });
      }
    } else res.send(data);
  });
};
