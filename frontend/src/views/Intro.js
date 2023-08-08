import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Button, Accordion,Form, Navbar,NavDropdown,ListGroup,Nav,Container,Card, Row,Col, Modal} from 'react-bootstrap'



function Intro() {
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    jobName: "",
    arch: "",
    storage: "",
  });

  const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [job, setJob] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
      setSuccessModal(false);
    }

    const show = () => {
      setSuccessModal(true);
    }

    
    function handleChange(e) {
      //console.log('working')
        setFormData({...formData,[e.target.name]: e.target.value.trim()})
        // alert('working')
        console.log(formData)
        
    }

    const HandleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      if (formData.jobName == "" || formData.jobName == null ) {
        window.scrollTo(0,0)
      return setError('Enter project name!');
      }


      if (formData.arch == "" || formData.arch == null ) {
        window.scrollTo(0,0)
      return setError('Select Architecture!');
      }

      if (formData.storage == "" || formData.storage == null ) {
          window.scrollTo(0,0)
        return setError('Select Storage!');
        }

      const headers = {
        //'X-CSRF-TOKEN': csrfToken,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
  
      axios.post('http://localhost:5000/API/iotsim/createjob', {
          jobName: formData.jobName,
          nodes: [],
          cloudProcessing: formData.arch,
          storage: formData.storage,
          
      },{headers})
      .then((response) => {
        console.log(response);
        if(response.data.message == 'success'){
          setFormData(initialFormData)
          setJob(response.data.data)
          localStorage.setItem('jobId',response.data.data._id);
          localStorage.setItem('job',JSON.stringify(response.data.data));
          //navigate('/architecture')
          //setSuccess('Trade created')
          //show animation
          show();
        }
        
        //navigate('/otp',{state:{username: formData.username, password: formData.password} })
      }, (error) => {
        console.log(error);
        return setError('Failed to create Network');
      });
  
  
    };

    const toArch = () => {
      navigate('/joblist', {state: {job: job}}  )
    }


  
  return (
    <div >

<Modal
        show={successModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Network Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Network created successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => toArch()}>View Networks</Button>
        </Modal.Footer>
      </Modal>


      <h3 style={{textAlign: 'center', marginTop: '30px'}}>IOT Simulator</h3>

      <h1 style={{textAlign: 'center', marginTop: '30px'}}>Create Network</h1>

      <div className='mx-auto d-block mt-3' style={{width: '50%'}}>
 {/* <Form.Group className="mb-3">
        <Form.Label>Pair</Form.Label>
        <Form.Control placeholder="select pair" />
      </Form.Group> */}
      <h3 style={{color: 'red', textAlign: 'center'}}>{error}</h3>

      <Form.Group className="mb-3">
        {/* <Form.Label>Collection interval</Form.Label> */}
        <Form.Control name="jobName" onChange={handleChange}  placeholder="Network Name" />
      </Form.Group> 


      <Form.Group className="mb-3">
        <Form.Label>Architecture type</Form.Label>
        <Form.Select name="arch" onChange={handleChange} >
          <option value=''>select architecture</option>
          <option  value={true} >Cloud</option>
          <option   value={false}>Edge</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cloud Storage</Form.Label>
        <Form.Select onChange={handleChange} name='storage' >
        <option value=''>Select Server storage (MB)</option>
          <option value='500'>500MB</option>
          <option value='750'>750MB</option>
          <option value='1000'>1000MB</option>
          <option value='2500'>2500MB</option>
          <option value='5000'>5000MB</option>
        </Form.Select>
      </Form.Group>


     <Button type='submit' onClick={HandleSubmit}  variant="primary">Create</Button>

    </div>
    </div>
    
  )
}

export default Intro