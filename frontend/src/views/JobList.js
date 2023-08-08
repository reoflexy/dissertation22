import React,{useEffect, useState} from 'react'
import axios from 'axios';
import serverImg from '../images/server.png'
import {useNavigate} from 'react-router-dom'
import {Image, Row, Col, Button, Modal, Form} from 'react-bootstrap'

function JobList() {
    const [jobList, setJobList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        const headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Credentials':true,
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
      
           axios.get('http://localhost:5000/API/iotsim/getjobs',
           
          {headers})
          .then((response) => {
            console.log(response.data.data);
            setJobList(response.data.data)
            //setNodeChange(false)
            
            //navigate('/otp',{state:{username: formData.username, password: formData.password} })
          }, (error) => {
            console.log(error);
           // return setError(error);
          });
    
},[])

const toArch = (item) => {
    localStorage.setItem('jobId',item._id);
    localStorage.setItem('job',JSON.stringify(item));
    navigate('/architecture')
}

  return (
    <>
    <h2 style={{textAlign: 'center'}}>Network List</h2>
    <div className='m-auto d-block' style={{width: '70%', height: '100vh', display: 'flex', flexDirection: 'column'}}>

    
        {jobList.length > 0 && 
        jobList.map((item,index) => {
            return(
                <div onClick={() => toArch(item)} key={index+1} className='mt-2' style={{width: '100%', height: '100px', borderColor: 'black', borderRadius: '10px', border: '1px solid black', padding: '3px', margin:'3px'}}>
        <img src={serverImg}  style={{width: '50px', height: '50px'}} />
                <div  style={{marginLeft: '50px'}}>Network Name:  {item.jobName} </div>
                <div  style={{marginLeft: '50px'}}>Server Storage:  {item.storage} </div>
                </div>
            )
        })
        }
            

    </div>
    </>
  )
}

export default JobList