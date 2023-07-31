const mongoose = require('mongoose')

const nodeSchema = new mongoose.Schema({
     jobId: {
        type: String,
        required: true
     },
     sensors: [
        {
            sensorName: String,
            dataSize: Number,
            sensorCount: Number
        }
     ],
     internalProcessing: {
        type: Boolean,
        required: true,
     },
     nodeName: {type: String, required: true},
     gatewayName: {type: String, required: true},
     gatewaySpeed: {type: Number, required: true},
     storage: {type: Number, required: false},
     collectionInterval: {type: Number, required: true},
     reportSize: {type: Number, required: false},
     

     
})

module.exports = mongoose.model('Nodes',nodeSchema)