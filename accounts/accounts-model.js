const db = require('../data/dbConfig');


    const getAll = () => {
      // return db.select().from('accounts')
      // return db.select('*').from('accounts')
      // return db.select('id', 'title', 'contents').from('accounts')
      return db('accounts') // short hand to do the same as above
    }
    const getById = (id) => {
      // return db('accounts').where({ id }).first()
      return db('accounts').where({ id })
    }
    const create = (account) => {
      return db('accounts').insert(account)
    }
    const update = (id, account) => {
      return db('accounts').where({ id }).update(account)
    }
    const remove = (id) => {
      return db('accounts').where({ id }).del()
    }
  
  // db helpers end
  module.exports = {getAll, getById, create,update, remove}

 