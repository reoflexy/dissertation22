const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    nodes: [
        {
            nodeId: String,
            nodeCount: Number
        }
     ],
     
     cloudProcessing: {
        type: Boolean,
        required: true,
     },
     storage: {type: Number, required: false},
     
     
})

module.exports = mongoose.model('Jobs',jobSchema)