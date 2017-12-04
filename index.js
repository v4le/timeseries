'use strict'

const Ajv = require("ajv")
const ajv = new Ajv();

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

module.exports = function (db) {

    const collection = db.collection('timeseries')

    return{
        addDataPoint
    }

    async function addDataPoint(point){

        const isValid = ajv.validate(schema, point)
        
        if (!isValid) {
            
            throw new Error(ajv.errorsText())
        }
    
        
        const result = await collection.insert(point)
        return result.insertedIds[0]
                
    }

    
}

