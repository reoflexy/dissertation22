const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    nodes: [
        {
            nodeId: String,
            nodeCount: Number
        }
     ],
     networkName: {type: String, required: true},
     networkSpeed: {type: String, required: true},
     bandwidth: {type: String, required: true},
     cloudProcessing: {
        type: Boolean,
        required: true,
     },
     storage: {type: Number, required: false},
     reportInterval: {type: Number, required: true},
     
})

module.exports = mongoose.model('Jobs',jobSchema)