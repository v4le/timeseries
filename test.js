const tap = require('tap')
const timeseries = require('./index.js')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost/node'

tap.throws(() => timeseries.addDataPoint(), {})
tap.throws(() => timeseries.addDataPoint({"assetId" : "10" }), {})
tap.throws(() => timeseries.addDataPoint({"time" : "1978/12/13" }), {})

tap.test("read after saving", test =>  {
    timeseries.addDataPoint({"assetId" : "10", "time" : "1978/12/13"}, id => {
        test.ok()
        test.end()
    // return timeseries.addDataPoint({"assetId" : "10", "time" : "1978/12/13"}, id => {
        // MongoClient.connect(url, (err, db) => {
        //     db.collection('timeseries')
        //         .findOne({_id : id})
        //         .then(document => {
        //             test.equal(document.assetId, "10")
        //             test.end()
        //         })
        // })    
    })
})

