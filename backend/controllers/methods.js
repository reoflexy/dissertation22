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
                nodeCount: response.nodeCount
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
    
    let reportList = []
    let report = {}

    const job = await jobMod.findOne({_id: req.query.jobId});
    console.log(job)

    const nodeList = job.nodes;

        //cloud processing
    if(job.cloudProcessing == true){

        //loop through nodes
        for (let i = 0; i < nodeList.length; i++) {
            const currentNode = nodeList[i];
    
            await nodeMod.findOne({_id: currentNode.nodeId})  
            .then((node) => {
                let nodeDataSize = 0;
                let nodeSensorCount = 0;
                let sensorDataSize = 0;
                let sensorDataSizePm = 0;
                let gatewayPercentageStrain = 0;
                let cloudPercentageStrain = 0;

                //sum datasizes for all sensors
                for(let i = 0; i < node.sensors.length; i++){
                    sensorDataSize = parseInt((node.sensors[i].dataSize*node.sensors[i].sensorCount),10) ;
                    //calculater sensor data size per minute
                    sensorDataSizePm = parseInt((sensorDataSize*60)/node.sensors[i].collectionInterval, 10)
                    nodeDataSize += sensorDataSizePm
                    totalDataSize += nodeDataSize
                    nodeSensorCount += parseInt(node.sensors[i].sensorCount,10) ;
                    totalSensorCount += nodeSensorCount
                }

                //compare with gateway bandwidth
                //console.log(job)
                if(node.gatewayBandwidth <= (nodeDataSize/60)){
                    report = {
                        reportType: 'error',
                        message: 'Gateway does not possess sufficient bandwidth to accommodate data from the sensor(s)'
                    }
                    reportList.push(report)
                    report = {}
                }
                 //compare with external bandwidth
                if(node.externalBandwidth <= (nodeDataSize/60)){
                    report = {
                        reportType: 'error',
                        message: 'External network connection does not possess sufficient bandwidth to transmit data from the gateway to the cloud'
                    }
                    reportList.push(report)
                    report = {}
                }

                //check percentage strain on internal network
                gatewayPercentageStrain = (((nodeDataSize/60)/node.gatewayBandwidth)*100)
                report = {
                    reportType: 'alert',
                    message: `${node.nodeName} will use ${gatewayPercentageStrain}% of gateway bandwidth`
                }
                reportList.push(report)
                report = {}

                //check percentage strain on external network
                cloudPercentageStrain = (((nodeDataSize/60)/node.externalBandwidth)*100)
                report = {
                    reportType: 'alert',
                    message: `${node.nodeName} will use ${cloudPercentageStrain}% of cloud network bandwidth`
                }
                reportList.push(report)
                report = {}
        
                //calculate time to max storage in minutes
                timeToMaxStorage = parseInt(job.storage/totalDataSize, 10)
                //add to report
                report = {
                    reportType: 'alert',
                    message: `The cloud storage selected will be filled in ${timeToMaxStorage} minutes with the current settings `
                }
                reportList.push(report)
                report = {}

                //sum to main dataSize count
                //totalDataSize += nodeDataSize
                
    
                //res.status(200).json({message: 'success',data: response});
            })
            .catch((err) => {
                res.status(500).json({message: 'failed, cannot access '+currentNode.nodeId, data: err});
            })
            
        }


        return res.status(200).json({message: 'success',data: reportList});

    }
    else if(job.cloudProcessing == false){
        //edge processing
  //loop through nodes
  for (let i = 0; i < nodeList.length; i++) {
    const currentNode = nodeList[i];

    await nodeMod.findOne({_id: currentNode.nodeId})  
    .then((node) => {
        let nodeDataSize = 0;
        let timeToMaxNodeStorage = 0;
        let reportSize = 0.1;
        let reportSizePm = 0;
        let nodeSensorCount = 0;
        let sensorDataSize = 0;
        let sensorDataSizePm = 0;
        let gatewayPercentageStrain = 0;
        let cloudPercentageStrain = 0;

        //sum datasizes for all sensors
        for(let i = 0; i < node.sensors.length; i++){
            sensorDataSize = parseInt((node.sensors[i].dataSize*node.sensors[i].sensorCount),10) ;
            //calculater sensor data size per minute
            sensorDataSizePm = parseInt((sensorDataSize*60)/node.sensors[i].collectionInterval, 10)
            nodeDataSize += sensorDataSizePm
            totalDataSize += nodeDataSize
            nodeSensorCount += parseInt(node.sensors[i].sensorCount,10) ;
            totalSensorCount += nodeSensorCount
        }

        //check percentage strain on edge node
        gatewayPercentageStrain = (((nodeDataSize/60)/node.gatewayBandwidth)*100)
        report = {
            reportType: 'alert',
            message: `${node.nodeName} will use ${gatewayPercentageStrain}% of gateway bandwidth`
        }
        reportList.push(report)
        report = {}

         //check percentage strain for external network
        
         cloudPercentageStrain = parseInt((reportSizePm/node.externalBandwidth)*100,10)
         report = {
             reportType: 'alert',
             message: `${node.nodeName} will use ${cloudPercentageStrain}% of cloud connection bandwidth per minute`
         }
         reportList.push(report)
         report = {}

        //compare with gateway bandwidth
        //console.log(job)
        if(node.gatewayBandwidth <= (nodeDataSize/60)){
            report = {
                reportType: 'error',
                message: 'Gateway does not possess sufficient bandwidth to accommodate data from the sensor(s)'
            }
            reportList.push(report)
            report = {}
        }

        reportSizePm = parseInt((reportSize*60)/node.reportInterval, 10)
        totalReportSize += reportSizePm

        timeToMaxNodeStorage = parseInt((node.storage/nodeDataSize), 10)
        //add to report
        report = {
            reportType: 'alert',
            message: `This storage for the node ${node.nodeName}, will be filled in ${timeToMaxNodeStorage} minutes with the current settings `
        }
        reportList.push(report)
        report = {}

       

        //sum to main dataSize count
        
        

        return res.status(200).json({message: 'success',data: reportList});

    })
    .catch((err) => {
        res.status(500).json({message: 'failed, cannot access '+currentNode.nodeId, data: err});
    })
    
}

timeToMaxStorage = parseInt((totalReportSize/job.storage), 10)
        //add to report
        report = {
            reportType: 'alert',
            message: `This storage for the cloud server, will be filled in ${timeToMaxStorage} minutes with the current settings `
        }
        reportList.push(report)
        report = {}



return res.status(200).json({message: 'success',data: reportList});

    }

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
    saveJobReportInterval
}
