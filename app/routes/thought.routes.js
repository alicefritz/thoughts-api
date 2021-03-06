module.exports = app => {
  const thoughts = require("../controllers/thought.controller.js");

  // Create a new Thought
  app.post("/thoughts", thoughts.create);

  // Retrieve all Customers
  app.get("/thoughts", thoughts.findAll);

   // Retrieve all Customers
   app.get("/thoughts_comments", thoughts.findAllWithComments);

  // Retrieve a single Customer with customerId
  app.get("/thoughts/:thoughtId", thoughts.findOne);
};