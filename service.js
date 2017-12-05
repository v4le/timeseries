'use strict'

const MyLogic = require('./index')

module.exports = function (fastify, options, next) {
    fastify.get('/', (request, reply) => {
      reply.send({ hello: 'world' })
    })

    fastify.post('/', async (request, reply) => {

      const myLogic = MyLogic(fastify.mongo)
      const id = await myLogic.addDataPoint(request.body);
    
      reply.send({ id: id })
    })
  
    next()
  }