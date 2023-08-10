const express= require('express')
const router = express.Router()

const {
    saveNode,
    createJob,
    saveJobNetwork,
    saveJobStorage,
    saveJobProcessing,
    getNode,
    getJobs,
    getJob,
    getNodes,
    simFunction,
    saveJobReportInterval,
    updateSensorInterval,
    updateNode
} = require('../controllers/methods')

router.route('/savenode').post(saveNode);
router.route('/createjob').post(createJob);
router.route('/savejobnetwork').patch(saveJobNetwork);
router.route('/savejobstorage').patch(saveJobStorage);
router.route('/savejobprocessing').patch(saveJobProcessing);
router.route('/savejobinterval').patch(saveJobReportInterval);
router.route('/getnode').get(getNode);
router.route('/getnodes').get(getNodes);
router.route('/getjobs').get(getJobs);
router.route('/getjob').get(getJob);
router.route('/simulate').get(simFunction);
router.route('/newInterval').post(updateSensorInterval);
router.route('/updatenode').post(updateNode);

module.exports = router