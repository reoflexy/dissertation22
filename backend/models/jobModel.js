const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    jobName: {type: String, required: true},
    nodes: [
        {
            nodeId: String,
            nodeCount: Number,
            nodeName: String
        }
     ],
    //  cloudProcessing: {
    //     type: Boolean,
    //     required: true,
    //  },
     storage: {type: Number, required: false},
     
     
})

module.exports = mongoose.model('Jobs',jobSchema)