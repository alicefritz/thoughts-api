const sql = require("./db.js");

// constructor
const Comment = function(comment){
  this.COMMENT = comment.comment;
  this.NAME = comment.name;
  this.ThoughtId = comment.thoughtId;
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created comment: ", { ...newComment });
    result(null, { ...newComment });
  });
};


Comment.findById = (thoughtId, result) => {
  sql.query(`SELECT * FROM comments WHERE ThoughtID = ${thoughtId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found comments: ", res);
      result(null, res);
      return;
    }

    // not found comments with the id
    result({ kind: "not_found" }, null);
  });
};

Comment.getAll = result => {
  sql.query("SELECT * FROM comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("comments: ", res);
    result(null, res);
  });
};

module.exports = Comment;