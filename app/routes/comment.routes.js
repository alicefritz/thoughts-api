module.exports = app => {
  const comments = require("../controllers/comment.controller.js");

  // Create a new Comment
  app.post("/comments", comments.create);

  // Retrieve all Comment
  app.get("/comments", comments.findAll);

  // Retrieve all Comments with ThoughtId
  app.get("/comments/:thoughtId", comments.findOne);
};