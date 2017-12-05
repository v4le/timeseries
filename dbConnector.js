'use strict'

const MongoClient = require('mongodb').MongoClient
const fp = require('fastify-plugin')

async function db (fastify, options) {
  const url = options.url
  delete options.url

  const db = await MongoClient.connect(url, options)
  fastify.decorate('mongo', db)
  fastify.addHook('onClose', async () => db.close())  
}

module.exports = fp(db)