'use strict'

const tap = require('tap')
const { beforeEach, test, afterEach } = tap
const Timeseries = require('../index.js')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost/node'


let db
let ts

beforeEach(function (done) {
    MongoClient.connect(url, function(err, _db){
        db = _db
        ts = Timeseries(db)
        done()
        })
})

afterEach(function (done) {
    db.close(done)
})

test('throws 1', async (t) => {
    try{
        await ts.addDataPoint({})
        t.fail()
    }
    catch(err){
        t.pass()
    }
})

test('throws 2', async (t) => {
    try{
        await ts.addDataPoint({"time" : "1978/12/13" })
        t.fail()
    }
    catch(err){
        t.pass()
    }
})

test('throws 3', async (t) => {
    try{
        await ts.addDataPoint({"assetId" : "10" })
        t.fail()
    }
    catch(err){
        t.pass()
    }
})

test("read after saving", async t =>  {
    const id = await ts.addDataPoint({"assetId" : "10", "time" : "1978/12/13"})
    const document = await db.collection('timeseries').findOne({_id : id})
    t.equal(document.assetId, "10")    
})

