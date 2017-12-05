'use strict'

var Fastify = require('fastify')
var service = require('./service')


var opts = {
    port: 3000,
    verbose: true,
    logger: {level: 'info'},
    url: 'mongodb://localhost/node'
}


    const app = Fastify(opts)
    app.register(service, opts)    
    app.listen(opts.port, (err) => {
      if (err) {
        throw err
      }
    
      app.log.info('server listening on port %d', app.server.address().port)
    })






