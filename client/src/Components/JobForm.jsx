import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import ResumeUpload from './ResumeUpload';


const JobForm = () => {
  const [formData, setFormData] = useState({
    experience: "",
    education: "",
    skills: ""
  });

  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)

  if(!isLoggedIn){
    return <Navigate to='/login'/>
  }

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token"); // get the token from local storage
    
    try {
      const res = await axios.post('http://localhost:5000/submit-job-form', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          
        }})
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
    


  return (
    <div> <h1 className='d-flex justify-content-center align-items-center'>Resume Details</h1>
    <div className='container'>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formExperience">
        <Form.Label>Experience</Form.Label>
        <Form.Control as="textarea" rows="3" name="experience" value={formData.experience} onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formEducation">
        <Form.Label>Education</Form.Label>
        <Form.Control as="textarea" rows="3" name="education" value={formData.education} onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formSkills">
        <Form.Label>Skills</Form.Label>
        <Form.Control type="text" name="skills" value={formData.skills} onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <h3 className='my-4'>Upload your Resume Below</h3>
    <ResumeUpload/>
    </div>
    
    </div>
  );
};

export default JobForm;
