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
            sensorCount: Number,
            collectionInterval: Number,

        }
     ],
     internalProcessing: {
        type: Boolean,
        required: true,
     },
     nodeName: {type: String, required: true},
     nodeCount: {type: Number, required: true},
     gatewayName: {type: String, required: true},
     gatewaySpeed: {type: Number, required: true},
     storage: {type: Number, required: false},
     externalNetworkName: {type: String, required: true},
     externalNetworkSpeed: {type: Number, required: true},
     gatewayBandwidth: {type: Number, required: true},
     externalBandwidth: {type: Number, required: true},
     reportSize: {type: Number, required: false},
     reportInterval: {type: Number, required: true},
     

     
})

module.exports = mongoose.model('Nodes',nodeSchema)