import React,{useState, useEffect} from 'react'
import { Location, useLocation } from 'react-router';
import serverImg from '../images/server.png'
import nodeImg from '../images/nodee.png'
import loadingImg from '../images/loading2.gif'
import {Image, Row, Col, Button, Modal, Form, Card} from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Architecture() {
    const state = useLocation()
    const jobId = localStorage.getItem('jobId');
    console.log(jobId)
    //console.log(state)
    const navigate = useNavigate();

    const sensorArray = [
        {
        name: "Temperature",
        datasize: "0.01",
        },
        {
        name: "Proximity",
        datasize: "0.01",
        },
        {
        name: "Image",
        datasize: "10",
        },
        {
        name: "Magnetic",
        datasize: "0.01",
        },
        {
            name: "Air quality",
            datasize: "1",
        },
        {
            name: "water quality",
            datasize: "1",
        },
        {
            name: "Heart rate",
            datasize: "0.01",
        },

    ]

    const gatewayArray = [
        {
        gatewayName: 'Modem/Dialup - 56kbit/s',
        gatewayBandwidth: 0.056,
        storage: 0
        },
        {
        gatewayName: 'ADSL Lite - 1.5Mbit/s',
        gatewayBandwidth: 1.5,
        storage: 0
        },
        {
        gatewayName: 'T1 DS1 - 1.54Mbit/s',
        gatewayBandwidth: 1.54,
        storage: 0
        },
        {
        gatewayName: 'E1/E-Carrier - 2.048Mbit/s',
        gatewayBandwidth: 2.048,
        storage: 0
        },
        {
        gatewayName: 'ADSL1 - 4Mbit/s',
        gatewayBandwidth: 4,
        storage: 0
        },
        {
        gatewayName: 'Ethernet - 10Mbit/s',
        gatewayBandwidth: 10,
        storage: 0
        },
        {
        gatewayName: 'Wireless 802.11b - 11Mbit/s',
        gatewayBandwidth: 11,
        storage: 0
        },
        {
        gatewayName: 'ADSL2+ - 24Mbit/s',
        gatewayBandwidth: 24,
        storage: 0
        },
        {
        gatewayName: 'T3 DS - 44.736Mbit/s',
        gatewayBandwidth: 44.736,
        storage: 0
        },
        {
        gatewayName: 'Wireless 802.11g - 54Mbit/s',
        gatewayBandwidth: 54,
        storage: 0
        },
        {
        gatewayName: 'Fast Ethernet - 100Mbit/s',
        gatewayBandwidth: 100,
        storage: 0
        },
        {
        gatewayName: 'OC3 - 155Mbit/s',
        gatewayBandwidth: 155,
        storage: 0
        },
        {
        gatewayName: 'Wireless 802.11N - 600Mbit/s',
        gatewayBandwidth: 600,
        storage: 0
        },
        {
        gatewayName: 'Gigabit Ethernet - 1024Mbit/s',
        gatewayBandwidth: 1024,
        storage: 0
        },
        

    ]

    const externalArray = [
        {
        gatewayName: 'Modem/Dialup - 56kbit/s',
        gatewayBandwidth: 0.056,
        storage: 0
        },
        {
        gatewayName: 'ADSL Lite - 1.5Mbit/s',
        gatewayBandwidth: 1.5,
        storage: 0
        },
        {
        gatewayName: 'T1 DS1 - 1.54Mbit/s',
        gatewayBandwidth: 1.54,
        storage: 0
        },
        {
        gatewayName: 'E1/E-Carrier - 2.048Mbit/s',
        gatewayBandwidth: 2.048,
        storage: 0
        },
        {
        gatewayName: 'ADSL1 - 4Mbit/s',
        gatewayBandwidth: 4,
        storage: 0
        },
        {
        gatewayName: 'Ethernet - 10Mbit/s',
        gatewayBandwidth: 10,
        storage: 0
        },
        {
        gatewayName: 'Wireless 802.11b - 11Mbit/s',
        gatewayBandwidth: 11,
        storage: 0
        },
        {
        gatewayName: 'ADSL2+ - 24Mbit/s',
        gatewayBandwidth: 24,
        storage: 0
        },
        {
        gatewayName: 'T3 DS - 44.736Mbit/s',
        gatewayBandwidth: 44.736,
        storage: 0
        },
        {
        gatewayName: 'Wireless 802.11g - 54Mbit/s',
        gatewayBandwidth: 54,
        storage: 0
        },
        {
        gatewayName: 'Fast Ethernet - 100Mbit/s',
        gatewayBandwidth: 100,
        storage: 0
        },
        {
        gatewayName: 'OC3 - 155Mbit/s',
        gatewayBandwidth: 155,
        storage: 0
        },
        {
        gatewayName: 'Wireless 802.11N - 600Mbit/s',
        gatewayBandwidth: 600,
        storage: 0
        },
        {
        gatewayName: 'Gigabit Ethernet - 1024Mbit/s',
        gatewayBandwidth: 1024,
        storage: 0
        },
        {
        gatewayName: 'Wireless 802.11ac - 1324Mbit/s',
        gatewayBandwidth: 1324,
        storage: 0
        },
        {
        gatewayName: 'OC48 - 2560Mbit/s',
        gatewayBandwidth: 2560,
        storage: 0
        },
        {
        gatewayName: 'Superspeed Usb - 5240Mbit/s',
        gatewayBandwidth: 5240,
        storage: 0
        },
        {
        gatewayName: 'Wireless 802.11ad - 7240Mbit/s',
        gatewayBandwidth: 7240,
        storage: 0
        },
        {
        gatewayName: '10 Gigabit Ethernet - 10,060Mbit/s',
        gatewayBandwidth: 10060,
        storage: 0
        },
        {
        gatewayName: 'Superspeed usb - 20,120Mbit/s',
        gatewayBandwidth: 20120,
        storage: 0
        },
        {
        gatewayName: 'Thunderbolt 3 - 40,240Mbit/s',
        gatewayBandwidth: 40240,
        storage: 0
        },
        

    ]

    const initialsensorData = Object.freeze({
      sensorName: "",
      dataSize: "",
      sensorCount: "",
      collectionInterval: ""
    });

    const initialgatewayData = Object.freeze({
        gatewayName: '',
        gatewayBandwidth: 0,
        storage: 0
      });

      const initialExternalData = Object.freeze({
        externalNetworkName: '',
        externalNetworkBandwidth: 0,
      });

    const initialFormData = Object.freeze({
        arch: "",
        storage: "",
        nodeName: "",
        reportInterval: ""
      });

    const [formData, setFormData] = useState(initialFormData);
    const [sensorData, setSensorData] = useState(initialsensorData);
    const [gatewayData, setGatewayData] = useState(initialgatewayData);
    const [externalData, setExternalData] = useState(initialExternalData);
    const [sensorList, setSensorList] = useState([]);
    const [nodeList, setNodeList] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newInterval, setNewInterval] = useState({});
    const [job, setJob] = useState('');
    const [defaultIndex, setDefaultIndex] = useState(0);
    const [addNode, setAddNode] = useState(false);
    const [selectedNode, setSelectedNode] = useState("");
    const [nodeChange, setNodeChange] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [successModal2, setSuccessModal2] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
            const headers = {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              }
          
               axios.get('http://localhost:5000/API/iotsim/getjob',
               {
                params: {
                    jobId: jobId,
                }
               },
              {headers})
              .then((response) => {
                console.log(response.data.data.nodes);
                setNodeList(response.data.data.nodes)
                //setNodeChange(false)
                
                //navigate('/otp',{state:{username: formData.username, password: formData.password} })
              }, (error) => {
                console.log(error);
               // return setError(error);
              });
        
    },[])

    useEffect(() => {
        if(nodeChange){
            const headers = {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              }
          
               axios.get('http://localhost:5000/API/iotsim/getjob',
               {
                params: {
                    jobId: jobId,
                }
               },
              {headers})
              .then((response) => {
                console.log(response.data.data.nodes);
                setNodeList(response.data.data.nodes)
                setNodeChange(false)
                
                //navigate('/otp',{state:{username: formData.username, password: formData.password} })
              }, (error) => {
                console.log(error);
               // return setError(error);
              });
        }
    },[nodeChange])

    let sensors = [];

    const handleClose = () => {
        setSuccessModal(false);
      }

      const handleClose2 = () => {
        setSuccessModal2(false);
      }

      const handleClose3 = () => {
        setEditModal(false);
      }
  
      const show = () => {
        setSuccessModal(true);
      }

      const show2 = () => {
        setSuccessModal2(true);
      }

      const show3 = () => {
        setEditModal(true);
      }

      const addSensor = () => {
        setAddNode(true);
      }

      const addToSensorArray = (e) => {
        e.preventDefault()
        setSensorList(current => [...current,sensorData])
        //sensors.push(sensorData)
        setSensorData(initialsensorData)
        setAddNode(false)
        //setSensorList(true)
        console.log(sensorList)
      }

      function handleChange(e) {
        //console.log('working')
          setFormData({...formData,[e.target.name]: e.target.value.trim()})
          // alert('working')
          console.log(formData) 
      }

      function handleSensorSelect(e) {
        //console.log( e.target.value)
          setSensorData({...sensorData,sensorName: sensorArray[e.target.value].name,
            dataSize: sensorArray[e.target.value].datasize
            //,sensorCount: 1
        })
          //setSensorData({...sensorData,datasize: sensorArray[e.target.value].datasize})
          // alert('working')
          console.log(sensorData)
      }

      function handleGatewaySelect(e) {
        //console.log( e.target.value)
          setGatewayData({...gatewayData,gatewayName: gatewayArray[e.target.value].gatewayName,
            gatewayBandwidth: gatewayArray[e.target.value].gatewayBandwidth
            //,sensorCount: 1
        })
          //setSensorData({...sensorData,datasize: sensorArray[e.target.value].datasize})
          // alert('working')
          console.log(gatewayData)
      }

      function handleExternalSelect(e) {
        //console.log( e.target.value)
          setExternalData({...externalData, externalNetworkName: externalArray[e.target.value].gatewayName,
            externalNetworkBandwidth: externalArray[e.target.value].gatewayBandwidth
            //,sensorCount: 1
        })
          //setSensorData({...sensorData,datasize: sensorArray[e.target.value].datasize})
          // alert('working')
          console.log(externalData)
      }

      function handleSensorChange(e) {
        //console.log('working')
          setSensorData({...sensorData,[e.target.name]: parseInt(e.target.value.trim())})
          //alert('working')
          console.log(sensorData) 
      }

      function handleGatewayChange(e) {
        //console.log('working')
          setGatewayData({...gatewayData,[e.target.name]: parseInt(e.target.value.trim())})
          //alert('working')
          console.log(gatewayData) 
      }

      const selectNode = (item) => {
        //setSelectedNode(item);
        //fetch node from db
        const headers = {
          //'X-CSRF-TOKEN': csrfToken,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    
        axios.get('http://localhost:5000/API/iotsim/getnode',{
          params: {
            nodeId: item,
          }
        },{headers})
        .then((response) => {
          //console.log(response.data.data);
          setSelectedNode(response.data.data)
          //setNodeChange(false)
          show3()
          
          //navigate('/otp',{state:{username: formData.username, password: formData.password} })
        }, (error) => {
          console.log(error);
         // return setError(error);
        });

       
        //console.log(item)
      }

      const handleInterval = (sensorId) => {
        const headers = {
          //'X-CSRF-TOKEN': csrfToken,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    
        axios.post('http://localhost:5000/API/iotsim/newInterval', {
            nodeId: selectedNode.nodeId,
            sensorId: sensorId,
            newInterval: newInterval.value
        },{headers})
        .then((response) => {
          console.log(response);
          if(response.data.message == 'success'){
            alert('Sensor Updated')
            
          }
          
          //navigate('/otp',{state:{username: formData.username, password: formData.password} })
        }, (error) => {
          console.log(error);
          return setError('Failed to edit sensor interval');
        });
        
      }
  
      const HandleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (sensorList.length < 1  ) {
          window.scrollTo(0,0)
        return setError('Add sensors to this node!');
        }
  
        if (formData.nodeName == "" || formData.nodeName == null ) {
            window.scrollTo(0,0)
          return setError('Enter name for this node!');
          }

          if (gatewayData.gatewayName == "" || gatewayData.gatewayName == null ) {
            window.scrollTo(0,0)
          return setError('Enter name for the gateway!');
          }

          if (externalData.externalNetworkName == "" || externalData.externalNetworkName == null ) {
            window.scrollTo(0,0)
          return setError('Select network for connecting to server!');
          }

          if (gatewayData.storage == "" || gatewayData.storage == null ) {
            window.scrollTo(0,0)
          return setError('Enter a storage value, 0 for cloud processing!');
          }

          if (formData.reportInterval == "" || formData.reportInterval == null ) {
            window.scrollTo(0,0)
          return setError('Enter report interval!');
          }
         
  
        const headers = {
          //'X-CSRF-TOKEN': csrfToken,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    
        axios.post('http://localhost:5000/API/iotsim/savenode', {
            jobId: jobId,
            sensors: sensorList,
            internalProcessing: true,
            nodeName: formData.nodeName,
            nodeCount: 1,
            gatewayName: gatewayData.gatewayName,
            storage: gatewayData.storage,
            externalNetworkName:externalData.externalNetworkName,
            gatewayBandwidth: gatewayData.gatewayBandwidth,
            externalBandwidth:externalData.externalNetworkBandwidth,
            reportSize: 0.1,
            reportInterval: formData.reportInterval
            
        },{headers})
        .then((response) => {
          console.log(response);
          if(response.data.message == 'success'){
            setFormData(initialFormData)
            //setJob(response.data.data)
            //localStorage.setItem('jobId',response.data.data._id);
            //navigate('/architecture')
            //setSuccess('Trade created')
            //show animation
            setSensorList([])
            setNodeChange(true)
            handleClose()
            show2();
          }
          
          //navigate('/otp',{state:{username: formData.username, password: formData.password} })
        }, (error) => {
          console.log(error);
          return setError('Failed to create node');
        });
    
    
      };

      const updateNode = async (e) => {
        e.preventDefault();
        setError('');
        console.log(selectedNode)

         if(gatewayData.gatewayName == "" || gatewayData.gatewayName == null){
          setGatewayData({...gatewayData,gatewayName: selectedNode.gatewayName,
            gatewayBandwidth: selectedNode.gatewayBandwidth
            //,sensorCount: 1
        })
         }

         if(gatewayData.storage == "" || gatewayData.storage == null){
          setGatewayData({...gatewayData,storage: selectedNode.storage,
            //,sensorCount: 1
        })
         }

         if(externalData.externalNetworkName == "" || externalData.externalNetworkName == null){
          setExternalData({...externalData, externalNetworkName: selectedNode.externalNetworkName,
            externalNetworkBandwidth: selectedNode.externalBandwidth
            //,sensorCount: 1
        })
         }

         if(formData.reportInterval == "" || formData.reportInterval == null){
          setFormData({...formData, reportInterval: selectedNode.reportInterval})
         }


  
        const headers = {
          //'X-CSRF-TOKEN': csrfToken,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    
        axios.post('http://localhost:5000/API/iotsim/updatenode', {
            nodeId: selectedNode._id,
            gatewayName: gatewayData.gatewayName,
            storage: gatewayData.storage,
            externalNetworkName:externalData.externalNetworkName,
            gatewayBandwidth: gatewayData.gatewayBandwidth,
            externalBandwidth:externalData.externalNetworkBandwidth,
            reportInterval: formData.reportInterval
            
        },{headers})
        .then((response) => {
          console.log(response);
          if(response.data.message == 'success'){
            setFormData(initialFormData)
            //setJob(response.data.data)
            //localStorage.setItem('jobId',response.data.data._id);
            //navigate('/architecture')
            //setSuccess('Trade created')
            //show animation
            setSensorList([])
            setNodeChange(true)
            handleClose3()
            //show2();
            alert('Node Updated')
          }
          
          //navigate('/otp',{state:{username: formData.username, password: formData.password} })
        }, (error) => {
          console.log(error);
          return setError('Failed to create node');
        });
    
    
      };

      const simulate = async (e) => {
        e.preventDefault();
        setError('');
        console.log(selectedNode)
  
        const headers = {
          //'X-CSRF-TOKEN': csrfToken,
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        setLoading(true)
    
        axios.get('http://localhost:5000/API/iotsim/simulate', 
        {
          
          params: {
            jobId: jobId,
          }
          
        }
        ,{headers})
        .then((response) => {
          console.log(response);
          if(response.data.message == 'success'){
           // setFormData(initialFormData)
           setLoading(false)
           navigate('/simresult', {state: {result: response.data.data}}  )
           // alert('Node Updated')
          }
          
          //navigate('/otp',{state:{username: formData.username, password: formData.password} })
        }, (error) => {
          console.log(error);
          return setError('Failed to create node');
        });
    
    
      };
      


  return (
    <div >
{loading &&  
<Image src={loadingImg}  rounded style={{width: '500px', height: '500px', marginTop: '10px', position: 'fixed', top: '30%', bottom: '70%', left: '40%', right: '60%'}} />
            }
    {/* create node */}
    <Modal show={successModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        //fullscreen="lg-down"
        centered
         >
        <Modal.Header closeButton>
          <Modal.Title>New node</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>

        <h1 style={{textAlign: 'center', marginTop: '30px'}}>Create Node</h1>
       {!addNode && <Button type='submit' className='m-auto d-block' onClick={addSensor}  variant="primary rounded">Add Sensor</Button>}

        <div className='mx-auto d-block mt-3' style={{width: '80%', overflow: 'auto'}}>
        {/* <Form.Group className="mb-3">
        <Form.Label>Pair</Form.Label>
        <Form.Control placeholder="select pair" />
        </Form.Group> */}
        <h3 style={{color: 'red', textAlign: 'center'}}>{error}</h3>

      {addNode &&  (<div style={{width: '100%'}}>
    <Form.Group className="mb-1">
        {/* <Form.Label>Select sensor</Form.Label> */}
        <Form.Select name="sensorpick" onChange={handleSensorSelect} >
          {/* <option value=''>Pick a sensor</option> */}
          <option  value="" >Select sensor</option>
          {
            sensorArray.map((item,index) => {
                return(
                    <option key={index+1}  value={index} >{item.name} </option>
                )
            })
          }
          
        </Form.Select>
      </Form.Group>


      <Form.Group className="mb-3">
        {/* <Form.Label>Collection interval</Form.Label> */}
        <Form.Control name="collectionInterval" onChange={handleSensorChange}  placeholder="Polling interval (seconds)" />
      </Form.Group> 

      <Form.Group className="mb-3">
        {/* <Form.Label>Collection interval</Form.Label> */}
        <Form.Control name="sensorCount" onChange={handleSensorChange}  placeholder="count" />
      </Form.Group>                                                                                                                                                                               

      <Button className='m-auto d-block' onClick={addToSensorArray}  variant="primary">Add</Button>
      </div>)}


     
          {sensorList.length > 0 && <h6 style={{textAlign: 'center'}}> sensors </h6>}
         { sensorList.length > 0 &&  <div  style={{width: '100%', height: '250px', overflow: 'auto', overflowX: 'hidden'}} >
          <Row>
      {sensorList.length > 0 && 
      sensorList.map((item,index) => {
        return( 
         
         
       
            <Col key={index+1} xs={12} sm={6} md={4} lg={4} className='mt-2' >
                <div style={{width: '100%', height: '100%', borderColor: 'black', borderRadius: '10px', border: '1px solid black', padding: '3px', margin:'3px'}}>
            <Image src={nodeImg} className='d-block m-auto' rounded style={{width: '100px', height: '100px', marginTop: '30px'}} />
            <span className='d-block m-auto mt-1' style={{textAlign: 'center'}}>name: {item.sensorName} </span>
            <span className='d-block m-auto mt-1' style={{textAlign: 'center'}}>datasize: {item.dataSize} </span>
            <span className='d-block m-auto mt-1' style={{textAlign: 'center'}}>count: {item.sensorCount} </span>
            </div>
            </Col>

       
   
    
    )
      })
      }
      </Row>
       </div>}

       <Form.Group className="mt-1">
        <Form.Label>Node name</Form.Label>
        <Form.Control name="nodeName" onChange={handleChange}  placeholder="Node name" />
      </Form.Group>
       

        <Form.Group className="mb-1 mt-1">
        <Form.Label>Select Gateway</Form.Label>
        <Form.Select name="gateway" onChange={handleGatewaySelect} >
          <option value=''>Gateway specifications</option>
          {
            gatewayArray.map((item,index) => {
                return( <option key={index+1} value={index} >{item.gatewayName} </option> )
            })
          }
         
         
        </Form.Select>
      </Form.Group>

      <Form.Group className="mt-1">
        <Form.Label>Gateway Storage</Form.Label>
        <Form.Control onChange={handleGatewayChange} name='storage'  placeholder="Storage" />
      </Form.Group>

      {/* external network */}

      
        <Form.Group className="mb-1 mt-1">
        <Form.Label>Server connection </Form.Label>
        <Form.Select name="gateway" onChange={handleExternalSelect} >
          <option value=''>connection specifications</option>
          {
            gatewayArray.map((item,index) => {
                return( <option key={index+1} value={index} >{item.gatewayName} </option> )
            })
          }
         
         
        </Form.Select>
      </Form.Group>

      
      <Form.Group className="mt-1">
        <Form.Label>Report interval</Form.Label>
        <Form.Control onChange={handleChange} name='reportInterval'  placeholder="interval to send Report(seconds) " />
      </Form.Group>
     


     <Button type='submit' className='mt-2' onClick={HandleSubmit}  variant="primary">Create</Button>

    </div>


        </Modal.Body>
    </Modal>

          {/* edit node */}
    <Modal show={editModal}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
        size="lg"
        //fullscreen="lg-down"
        centered
         >
        <Modal.Header closeButton>
          <Modal.Title>Edit node - {selectedNode.nodeName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>

       
        <div className='mx-auto d-block mt-3' style={{width: '80%', overflow: 'auto'}}>
        {/* <Form.Group className="mb-3">
        <Form.Label>Pair</Form.Label>
        <Form.Control placeholder="select pair" />
        </Form.Group> */}
        <h3 style={{color: 'red', textAlign: 'center'}}>{error}</h3>

 
          {selectedNode != "" && <h6 style={{textAlign: 'center'}}> sensors </h6>}
         { selectedNode != "" &&  <div  style={{width: '100%', height: '250px', overflow: 'auto', overflowX: 'hidden'}} >
          
      {selectedNode != "" && 
      selectedNode.sensors.map((item,index) => {
        return( 
         
         
          <Row key={index+1} xs={12} sm={12} md={12} lg={12} className='mt-2'>
            <Col  >
                <div style={{width: '100%', height: '100%', borderColor: 'black', borderRadius: '10px', border: '1px solid black', padding: '3px', margin:'3px',display: 'flex', flexDirection: 'row'}}>
            <div>
            <Image src={nodeImg} className='' rounded style={{width: '100px', height: '100px', marginTop: '10px'}} />
            </div>

            <div style={{marginLeft: '20px'}}>
            <span className='d-block m-auto ' style={{}}>name: {item.sensorName} </span>
            <span className='d-block m-auto ' style={{}}>datasize: {item.dataSize} </span>
            <span className='d-block m-auto ' style={{}}>count: {item.sensorCount} </span>

            <Form.Label>Collection Interval: {item.collectionInterval} </Form.Label>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <Form.Range min={0} max={120} 
            onChange={(e) => {
              
              setNewInterval({index: index,value: e.target.value});
              console.log(newInterval)
            }} 
            className='m-1' defaultValue={item.collectionInterval}  color='blue'  />
           
            <Button onClick={() => handleInterval(item._id)} className='btn-primary sm m-1'>Save</Button>
            </div>
            <span className='d-block m-auto ' style={{}}>New Interval:
             {
              newInterval.index == index && newInterval.value
             }
             </span>
            </div>
            
            </div>
            </Col>
            </Row>
       
   
    
    )
      })
      }
      
       </div>}

        <Form.Group className="mb-1 mt-1">
        <Form.Label>Select Gateway - {selectedNode.gatewayName}</Form.Label>
        <Form.Select  name="gateway" onChange={handleGatewaySelect} >
          <option value=''>Gateway specifications</option>
          {
            gatewayArray.map((item,index) => {
                return( <option key={index+1} value={index} >{item.gatewayName} </option> )
            })
          }
         
         
        </Form.Select>
      </Form.Group>

      <Form.Group className="mt-1">
        <Form.Label>Gateway Storage </Form.Label>
        <Form.Control onChange={handleGatewayChange} defaultValue={selectedNode.storage} name='storage'  placeholder="Storage" />
      </Form.Group>

      {/* external network */}

      
        <Form.Group className="mb-1 mt-1">
        <Form.Label>Server connection - {selectedNode.externalNetworkName} </Form.Label>
        <Form.Select  name="gateway" onChange={handleExternalSelect} >
          <option value=''>connection specifications</option>
          {
            gatewayArray.map((item,index) => {
              
                return( <option key={index+1}  value={index} >{item.gatewayName} </option> )
            })
          }
         
         
        </Form.Select>
      </Form.Group>

      
      <Form.Group className="mt-1">
        <Form.Label>Report interval</Form.Label>
        <Form.Control onChange={handleChange} name='reportInterval' defaultValue={selectedNode.reportInterval} placeholder="interval to send Report(seconds) " />
      </Form.Group>
     


     <Button type='submit' className='mt-2' onClick={updateNode}  variant="primary">Create</Button>

    </div>


        </Modal.Body>
    </Modal>

          {/* success modal */}
      <Modal
        show={successModal2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Node Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Node created successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={() => toArch()}>Add Nodes</Button> */}
        </Modal.Footer>
      </Modal>

        
        <div style={{width: '50%', height: '90vh', background: 'lightblue', borderRadius: '10px'}} className='d-block m-auto mt-5'>
        
        <Image src={serverImg} className='d-block m-auto ' rounded style={{width: '200px', height: '200px', marginTop: '30px'}} />
        <span className='d-block m-auto mt-1' style={{textAlign: 'center'}}>Id: {jobId}</span>
        <span className='d-block m-auto mt-1' style={{textAlign: 'center'}}>Storage: 2000MB</span>
        <Button className='btn-primary sm d-block m-auto mt-2' onClick={() => setSuccessModal(true)} >Add Node</Button>

        <div style={{width: '100%', height: '70%', overflow: 'auto', overflowX: 'hidden'}} className='mt-5'>
            <h2 style={{textAlign: 'center'}}> Nodes </h2>
            <Row>

            {
                nodeList.length > 0 && nodeList.map((item,index) => {
                    return (
                    <Col key={index+1} xs={12} sm={6} md={4} lg={3} className='mt-2' >
                        <div style={{width: '100%', height: '100%', borderColor: 'black', borderRadius: '10px', border: '1px solid black', padding: '3px', margin:'1px'}}>
                    <Image src={nodeImg} className='d-block m-auto' rounded style={{width: '100px', height: '100px', marginTop: '30px'}} />
                    <span className='d-block m-auto mt-1' style={{textAlign: 'center'}}>{item.nodeName}</span>
                    <Button onClick={() => selectNode(item.nodeId)} className='btn-primary'>Edit</Button>
                    </div>
                    </Col>

                    


                    )
                })
            }

                

            </Row>

        </div>


        </div>
    
        <Button className='btn-success sm d-block m-auto mt-2' onClick={simulate} >Run Simulation</Button>

    </div>
  )
}

export default Architecture