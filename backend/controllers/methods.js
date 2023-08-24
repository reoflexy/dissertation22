const authMiddleware = require('../middleware/auth')
const jobMod = require('../models/jobModel')
const nodeMod = require('../models/nodeModel')

const saveNode = async(req,res) => {
await nodeMod.create(req.body)
.then((response) => {
    jobMod.findByIdAndUpdate({_id: req.body.jobId},
        {
            $push: {
            nodes: {
                nodeId: response._id,
                nodeCount: response.nodeCount,
                nodeName: response.nodeName
            },
          }
        }, {
            new: true,
            runValidators: true,
        })
        .then((response) => {
            console.log('Added node to job')
           // res.status(200).json({message: 'success',data: response});
        })
        .catch((err) => {
            res.status(500).json({message: 'adding to job failed',data: err});
        })

    res.status(200).json({message: 'success',data: response});
    //save nodeId to job under nodes array
})
.catch((err) => {
    res.status(500).json({message: 'failed',data: err});
})

}

const createJob = async(req,res) => {
await jobMod.create(req.body)
.then((response) => {
    
    res.status(200).json({message: 'success',data: response});
})
.catch((err) => {
    res.status(500).json({message: 'failed',data: err});
})

}

const saveJobNetwork = async(req,res) => {
await jobMod.findByIdAndUpdate({_id: req.query.jobId},
    req.body, {
        new: true,
        runValidators: true,
    })
    .then((response) => {
        res.status(200).json({message: 'success',data: response});
    })
    .catch((err) => {
        res.status(500).json({message: 'failed',data: err});
    })
    
}

const saveJobStorage = async(req,res) => {
    await jobMod.findByIdAndUpdate({_id: req.query.jobId},
        req.body, {
            new: true,
            runValidators: true,
        })
        .then((response) => {
            res.status(200).json({message: 'success',data: response});
        })
        .catch((err) => {
            res.status(500).json({message: 'failed',data: err});
        })
        
    }

    const saveJobReportInterval = async(req,res) => {
        await jobMod.findByIdAndUpdate({_id: req.query.jobId},
            req.body, {
                new: true,
                runValidators: true,
            })
            .then((response) => {
                res.status(200).json({message: 'success',data: response});
            })
            .catch((err) => {
                res.status(500).json({message: 'failed',data: err});
            })
            
    }

const saveJobProcessing = async(req,res) => {
        await jobMod.findByIdAndUpdate({_id: req.body.jobId},
            req.body, {
                new: true,
                runValidators: true,
            })
            .then((response) => {
                res.status(200).json({message: 'success',data: response});
            })
            .catch((err) => {
                res.status(500).json({message: 'failed',data: err});
            })
            
    }

const getNodes = async(req,res) => {
    
    await nodeMod.find({})
    .then((response) => {
        res.status(200).json({message: 'success',data: response});
    })
    .catch((err) => {
        res.status(500).json({message: 'failed',data: err});
    })

}
const getJobs = async(req,res) => {
    
    await jobMod.find({})
    .then((response) => {
        res.status(200).json({message: 'success',data: response});
    })
    .catch((err) => {
        res.status(500).json({message: 'failed',data: err});
    })

}

const getNode = async(req,res) => {
    await nodeMod.findOne({_id: req.query.nodeId})
    .then((response) => {
        res.status(200).json({message: 'success',data: response});
    })
    .catch((err) => {
        res.status(500).json({message: 'failed',data: err});
    })

}

const getJob = async(req,res) => {
    await jobMod.findOne({_id: req.query.jobId})
    .then((response) => {
        res.status(200).json({message: 'success',data: response});
    })
    .catch((err) => {
        res.status(500).json({message: 'failed',data: err});
    })

}

const simFunction = async(req,res) => {
    //get nodes from job
    let totalDataSize = 0;
    let totalReportSize = 0;
    let totalSensorCount = 0;
    let cloudPercentageStrain = 0;
    let timeToMaxStorage = 0;
    let ctimeToMaxCloudStorage = 0;
    let etimeToMaxCloudStorage = 0;
   

    
    let reportList = []
    let report = {}

    let storageReportList = []
    let storageReport = {}
   // console.log(req.query.jobId)
    //console.log(3742)
    const job = await jobMod.findOne({_id: req.query.jobId});
    //console.log(3742)

    const nodeList = job.nodes;

    //check that nodelist isnt empty
    if(nodeList.length < 1){
      return  res.status(500).json({message: 'There are no nodes on this network '});
    }

     //loop through nodes
     for (let i = 0; i < nodeList.length; i++) {
        const currentNode = nodeList[i];

        await nodeMod.findOne({_id: currentNode.nodeId})  
        .then((node) => {
            let sensorBandwidth = 0;
            let sensorBandwidthPerMinute = 0;
            let allSensorsBandwidth = 0;
            let allSensorsBandwidthPerMinute = 0;
            let gatewayPercentageStrain = 0;
            let edgeCloudPercentageStrain = 0;
            let cloudCloudPercentageStrain = 0;
            let timeToMaxNodeStorage = 0
           

            // let nodeDataSize = 0;
             let nodeSensorCount = 0;
            // let sensorDataSize = 0;
            // let sensorDataSizePm = 0;
            // let gatewayPercentageStrain = 0;
            // let cloudPercentageStrain = 0;

            //sum datasizes for all sensors
            for(let i = 0; i < node.sensors.length; i++){
                sensorBandwidth = parseFloat((node.sensors[i].dataSize*node.sensors[i].sensorCount),10) ;
               
                // //calculater sensor data size per minute
                sensorBandwidthPerMinute = parseFloat((sensorBandwidth*60)/node.sensors[i].collectionInterval, 10)
                // console.log(sensorDataSizePm)
                 allSensorsBandwidth += sensorBandwidth
                 allSensorsBandwidthPerMinute += sensorBandwidthPerMinute 
                // totalDataSize += nodeDataSize
                 nodeSensorCount += parseFloat(node.sensors[i].sensorCount,10) ;
                // totalSensorCount += nodeSensorCount
            }

            //check percentage strain on internal network
            gatewayPercentageStrain = ((allSensorsBandwidth)/node.gatewayBandwidth)*100

            //check cloud percentage strain for both node and edge scenarios

            //edge cloud percentage strain when processing is done in the node/edge
            edgeCloudPercentageStrain = ((node.reportSize)/node.externalBandwidth)*100

            //cloud cloud percentage strain when processing is done in the cloud
            cloudCloudPercentageStrain = ((allSensorsBandwidth)/node.externalBandwidth)*100

            //time taken to fill node storage, calculate only in edge scenario
            if(node.storage > 0){
                timeToMaxNodeStorage = parseFloat((allSensorsBandwidthPerMinute*node.storage), 10)
            }
            
            //time to max cloud storage cloud scenario
            ctimeToMaxCloudStorage += parseFloat((job.storage/allSensorsBandwidthPerMinute), 10)

            //time to max cloud storage edge scenario
            etimeToMaxCloudStorage += parseFloat( job.storage/((node.reportSize*60)/node.reportInterval), 10)

            report = {
              sensorsBandwidth: allSensorsBandwidth,
              sensorsBandwidthPm: allSensorsBandwidthPerMinute,
              gatewayBandwidth: node.gatewayBandwidth,
              externalBandwidth: node.externalBandwidth,
              gatewayPercentageStrain: gatewayPercentageStrain,
              eCloudPercentageStrain: edgeCloudPercentageStrain,
              cCloudPercentageStrain: cloudCloudPercentageStrain,
              timeToMaxNodeStorage: timeToMaxNodeStorage,
            //   ctimeToMaxCloudStorage: ctimeToMaxCloudStorage,
            //   etimeToMaxCloudStorage: etimeToMaxCloudStorage,
              nodeName: node.nodeName,
              jobId: node.jobId

                             }
            reportList.push(report)
            report = {}
           

        })
        .catch((err) => {
            res.status(500).json({message: 'failed, cannot access '+currentNode.nodeId, data: err});
        })
        
     }

     storageReport = {
        jobId: req.query.jobId, 
        ctimeToMaxCloudStorage: parseInt(ctimeToMaxCloudStorage/nodeList.length,10),
        etimeToMaxCloudStorage: parseInt(etimeToMaxCloudStorage/nodeList.length,10),
                    }
    //console.log(ctimeToMaxCloudStorage)
      storageReportList.push(storageReport)
      storageReport = {}


    return res.status(200).json({message: 'success',data: reportList, data2: storageReportList});


}

const updateSensorInterval = async(req,res) => {
    nodeMod.findOneAndUpdate(
        { _ids: req.body.nodeId, 'sensors._id': req.body.sensorId },
        {
          $set: {
            'sensors.$.collectionInterval': req.body.newInterval, 
          }
        }
       )
       .then((response) => {
        res.status(200).json({message: 'success',data: response});
       })
       .catch((err) => {
        res.status(500).json({message: 'failed',data: err});
       })
}

const updateNode = async(req,res) => {
    await nodeMod.findByIdAndUpdate({_id: req.body.nodeId},
        req.body, {
            new: true,
            runValidators: true,
        })
        .then((response) => {
            res.status(200).json({message: 'success',data: response});
        })
        .catch((err) => {
            res.status(500).json({message: 'failed',data: err});
        })
        
}




module.exports = {
    saveNode,
    createJob,
    saveJobNetwork,
    saveJobStorage,
    saveJobProcessing,
    getNode,
    getNodes,
    getJobs,
    getJob,
    simFunction,
    saveJobReportInterval,
    updateSensorInterval,
    updateNode
}
