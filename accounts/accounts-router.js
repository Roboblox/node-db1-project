const express = require('express');
// database access using knex
const Accounts = require('./accounts-model');

const router = express.Router();


  router.get('/', (req, res) => {
    Accounts.getAll()
      .then(data => {
        res.json(data)
      })
      .catch(error => {
        // res.json({ message: 'oops, something went wrong' }) // production
        res.json({ error: error.message }) // development
      })
  });
  router.get('/:id', (req, res) => {
    Accounts.getById(req.params.id)
      .then(data => {
        // if empty dataset, do something different
        if (!data.length) {
          res.json({ message: 'no account with said id' })
        } else {
          res.json(data[0])
        }
      })
      .catch(error => {
        res.json({ message: error.message })
      })
  });
  router.post('/', (req, res) => {
    Accounts.create(req.body)
      .then(([id]) => {
        return Accounts.getById(id).first()
      })
      .then(data => {
        res.json(data)
      })
      .catch(error => {
        res.json({ message: error.message })
      })
  });
  router.put('/:id', (req, res) => {
    Accounts.update(req.params.id, req.body)
      .then(count => {
        if (!count) {
          res.json({ message: 'no account with that id' })
        } else {
          return Accounts.getById(req.params.id).first()
        }
      })
      .then(data => {
        res.json(data)
      })
      .catch(error => {
        res.json({ message: error.message })
      })
  });
  router.delete('/:id', (req, res) => {
    Accounts.remove(req.params.id)
      .then(deletedRowsNumber => {
        if (!deletedRowsNumber) {
          res.json({ message: 'no account with given id' })
        } else {
          res.json({ message: 'account deleted successfully' })
        }
      })
      .catch(error => {
        res.json({ message: error.message })
      })
  });
  module.exports = router;