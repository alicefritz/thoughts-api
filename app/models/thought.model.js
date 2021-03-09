const sql = require("./db.js");

// constructor
const Thought = function(thought){
  this.thinker = thought.thinker;
  this.thought = thought.thought;
  this.time = thought.time;
};

Thought.create = (newThought, result) => {
  sql.query("INSERT INTO thoughts SET ?", newThought, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created thought: ", { id: res.insertId, ...newThought });
    result(null, { ThoughtID: res.insertId, ...newThought });
  });
};


Thought.findById = (thoughtId, result) => {
  sql.query(`SELECT * FROM thoughts WHERE id = ${thoughtId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found thought: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Thought with the id
    result({ kind: "not_found" }, null);
  });
};


Thought.getAll = result => {
  sql.query(`SELECT thoughts.*, COUNT(comment) AS comment_count
  FROM thoughts
  LEFT JOIN comments ON thoughts.ThoughtID = comments.ThoughtID
  GROUP BY ThoughtID`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("thoughts: ", res);
    result(null, res);
  });
};


module.exports = Thought;