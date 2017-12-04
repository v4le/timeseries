const Ajv = require("ajv")
const ajv = new Ajv();

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost/node'

const schema = {
    "id": "http://json-schema.org/datapoint",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "type" : "object",
    "properties" : {
        "assetId" : { "type" : "string" },
        "position" : {
            "type" : "object",
            "properties" :{
                "latitude" : { "type" : "number" },
                "longitude" : { "type" : "number" }
            }
        },
        "time" : { "type" : "string" }
    },
    "required" : ["assetId", "time"]
}

module.exports.addDataPoint = function (point, cb) {
    const isValid = ajv.validate(schema, point)
    
    if (!isValid) {
        throw new Error(ajv.errorsText())
    }

    MongoClient.connect(url, (err, db) => {
        db.collection('timeseries')
            .insert(point)
            .then(result => {
                cb(result.insertedIds[0])
            })
    })
}

