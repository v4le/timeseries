'use strict'

const Fastify = require('fastify')
const request = require('request')
const {
  beforeEach,
  afterEach,
  test
} = require('tap')
const dbConnector = require('../dbConnector.js')
const service = require('../service.js')

let server
let address
beforeEach((done) => {

var opts = {
 url: 'mongodb://localhost/node_test'
}
  server = Fastify()
  server.register(service, opts)
  server.listen(0, (err) => {
    if (err) {
      return done(err)
    }

    address = `http://localhost:${server.server.address().port}/`
    done()
  })
})

afterEach((done) => {
  server.close(done)
})

test('GET /', function (t) {
  t.plan(3)

  request.get(address, function (err, res, body) {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.deepEqual(JSON.parse(body), { hello: 'world' })
  })
})

test('POST /', function (t) {
  // t.plan(3)

  const opts = {
    url: address,
    json: true,
    "content-type": 'application/json',
    'body' : {"assetId" : "10", "time" : "1978/12/13"}
  }
  request.post(opts, function (err, res, body) {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.notEqual(body.id, null)
    t.end()
  })
})
