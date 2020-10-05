const express = require("express");

// database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  // get a list of posts from the database
  // SELECT * FROM posts
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((error) => {
      console.log(err);
      res.status(500).json({ message: "no" });
    });

  // return the list of accounts
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // select * from accounts where id=1;
  db.select("*")
    .from("accounts")
    // .where("id", "=", id)
    // .where("id", id)
    .where({ id })
    .first() // same as grabbing the first element from the array manuall with account[0]
    .then((account) => {
      res.status(200).json({ data: account });
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.post("/", (req, res) => {
  const accountData = req.body;

  // validate the data

  db("accounts")
    .insert(accountData, "id")
    .then((ids) => {
      db("accounts")
        .where({ id: ids[0] })
        .first()
        .then((account) => {
          res.status(200).json({ data: account });
        });
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("accounts")
    .where({ id })
    .update(changes) // don't forget to have a WHERE
    .then((count) => {
      // count is the number of records updated
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "there was no record to update" });
      }
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .del() // don't forget to have a where
    .then((count) => {
      // count is the number of records deleted
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "there was no record to delete" });
      }
    })
    .catch((error) => {
      handleError(error, res);
    });
});

function handleError(error, res) {
  console.log("error", error);
  res.status(500).json({ message: error.message });
}

module.exports = router;
