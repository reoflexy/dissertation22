const express = require('express')
const cors = require('cors')
require('dotenv').config();
const tasks = require('./routes/tasks')
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));
app.use('/API/iotsim',tasks)
app.listen(port,()=>{
    console.log("Server is running on port: "+port)
})