const authMiddleware = require('../middleware/auth')
const jobMod = require('../models/jobModel')
const nodeMod = require('../models/nodeModel')

const saveNode = async(req,res) => {
await nodeMod.create(req.body)
.then((response) => {
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

const saveJobStorage = async(req,res) => {
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

const getNode = async(req,res) => {
    await nodeMod.findOne({_id: req.body.id})
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
    let totalSensorCount = 0;
    let cloudPercentageStrain = 0;
    let timeToMaxStorage = 0;
    
    let reportList = []
    let report = {}

    const job = await jobMod.findOne({_id: req.body.jobId});
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
                let gatewayPercentageStrain = 0;

                //sum datasizes for all sensors
                for(let i = 0; i < node.sensors.length; i++){
                    nodeDataSize += parseInt((node.sensors[i].dataSize*node.sensors[i].sensorCount),10) ;
                    nodeSensorCount += parseInt(node.sensors[i].sensorCount,10) ;
                }

                //check percentage strain
                gatewayPercentageStrain = ((nodeDataSize/node.gatewaySpeed)*100)
                report = {
                    reportType: 'alert',
                    message: `${node.nodeName} will use ${gatewayPercentageStrain}% of gateway bandwidth`
                }
                reportList.push(report)
                report = {}
    
                //compare with gateway bandwidth
                //console.log(job)
                if(node.gatewaySpeed >= nodeDataSize){
                    report = {
                        reportType: 'error',
                        message: 'Gateway does not possess sufficient bandwidth to accommodate data from the sensor(s)'
                    }
                    reportList.push(report)
                    report = {}
                }

                //sum to main dataSize count
                totalDataSize += nodeDataSize
                totalSensorCount += nodeSensorCount
    
                //res.status(200).json({message: 'success',data: response});
            })
            .catch((err) => {
                res.status(500).json({message: 'failed, cannot access '+currentNode.nodeId, data: err});
            })
            
        }


        

        //calculate cloud percentage strain then add to report
        if(totalDataSize >= job.bandwidth){
            report = {
                reportType: 'error',
                message: 'Cloud network does not possess sufficient bandwidth to accommodate data from the node(s)'
            }
            reportList.push(report)
            report = {}
        }

        cloudPercentageStrain = parseInt((totalDataSize/job.bandwidth)*100, 10)
                report = {
                    reportType: 'alert',
                    message: `This setup will use ${cloudPercentageStrain}% of cloud connection bandwidth`
                }
                reportList.push(report)
                report = {}
        
        //calculate time to max storage
        timeToMaxStorage = parseInt((job.reportInterval*job.storage)/totalDataSize, 10)
        //add to report
        report = {
            reportType: 'alert',
            message: `This storage selected will be filled in ${timeToMaxStorage} seconds with the current settings `
        }
        reportList.push(report)
        report = {}

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
        let nodeSensorCount = 0;
        let gatewayPercentageStrain = 0;
        let timeToMaxNodeStorage = 0;
        let reportSize = 0;

        //sum datasizes for all sensors
        for(let i = 0; i < node.sensors.length; i++){
            nodeDataSize += parseInt((node.sensors[i].dataSize*node.sensors[i].sensorCount),10) ;
            nodeSensorCount += parseInt(node.sensors[i].sensorCount,10) ;
        }

        //check percentage strain
        gatewayPercentageStrain = ((nodeDataSize/node.gatewaySpeed)*100)
        report = {
            reportType: 'alert',
            message: `${node.nodeName} will use ${gatewayPercentageStrain}% of gateway bandwidth`
        }
        reportList.push(report)
        report = {}

        //compare with gateway bandwidth
        //console.log(job)
        if(node.gatewaySpeed >= nodeDataSize){
            report = {
                reportType: 'error',
                message: 'Gateway does not possess sufficient bandwidth to accommodate data from the sensor(s)'
            }
            reportList.push(report)
            report = {}
        }

        timeToMaxNodeStorage = parseInt((node.collectionInterval*node.storage)/nodeDataSize, 10)
        //add to report
        report = {
            reportType: 'alert',
            message: `This storage for the node ${node.nodeName}, will be filled in ${timeToMaxNodeStorage} seconds with the current settings `
        }
        reportList.push(report)
        report = {}

        //sum to main dataSize count
        reportSize = 0.1 //mb
        totalDataSize += reportSize
        totalSensorCount += nodeSensorCount

        return res.status(200).json({message: 'success',data: reportList});

    })
    .catch((err) => {
        res.status(500).json({message: 'failed, cannot access '+currentNode.nodeId, data: err});
    })
    
}

//calculate cloud percentage strain then add to report
if(totalDataSize >= job.bandwidth){
    report = {
        reportType: 'error',
        message: 'Cloud network does not possess sufficient bandwidth to accommodate data from the node(s)'
    }
    reportList.push(report)
    report = {}
}

cloudPercentageStrain = parseInt((totalDataSize/job.bandwidth)*100)
        report = {
            reportType: 'alert',
            message: `This setup will use ${cloudPercentageStrain}% of cloud connection bandwidth`
        }
        reportList.push(report)
        report = {}

    timeToMaxStorage = parseInt((job.reportInterval*job.storage)/totalDataSize, 10)
    //add to report
    report = {
        reportType: 'alert',
        message: `The cloud storage for the setup will be filled in ${timeToMaxStorage} seconds with the current settings `
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
    simFunction
}
