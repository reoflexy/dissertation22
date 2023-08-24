import React, {useEffect,useRef} from 'react'
import {select} from 'd3'
import { Location, useLocation } from 'react-router';


import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

function SimResult() {
    

      const state = useLocation()
      const data = state.state.result
      const data2 = state.state.result2
      console.log(state.state)
 

    useEffect(() => {
       
    },[])



  return (
    <div  style={{marginBottom: '3px'}}>
       
        <div className='container' style={{padding: '5px', overflow: 'auto'}}>
        <BarChart
      width={1200}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
      
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="nodeName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="eCloudPercentageStrain" stackId="a" fill="#8884d8" />
      <Bar dataKey="cCloudPercentageStrain" stackId="a" fill="#82ca9d" />
    </BarChart>
    <h4 style={{textAlign: 'center'}}>Enternal network bandwidth used in edge versus in cloud based setup </h4>

    <BarChart
      width={1200}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
      
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="nodeName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="gatewayPercentageStrain" stackId="a" fill="#8884d8" />
      {/* <Bar dataKey="cCloudPercentageStrain" stackId="a" fill="#82ca9d" /> */}
    </BarChart>
    <h4 style={{textAlign: 'center'}}>internal node bandwidth used during polling </h4>



    <BarChart
      width={1200}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
      
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="nodeName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="timeToMaxNodeStorage" stackId="a" fill="#8884d8" />
      {/* <Bar dataKey="timeToMaxCloudStorage" stackId="a" fill="#82ca9d" /> */}
    
    </BarChart>
    <h4 style={{textAlign: 'center'}}>Time until storage capacity is reached in all nodes</h4>


    <BarChart
      width={500}
      height={500}
      data={data2}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
      
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="jobId" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="ctimeToMaxCloudStorage" stackId="a" fill="#8884d8" />
      <Bar dataKey="etimeToMaxCloudStorage" stackId="a" fill="#82ca9d" />
    
    </BarChart>
    <h4 style={{textAlign: 'center'}}>Time until cloud storage capacity is reached in edge versus in cloud based setup for all nodes</h4>


        </div>

       
    </div>
  )
}

export default SimResult