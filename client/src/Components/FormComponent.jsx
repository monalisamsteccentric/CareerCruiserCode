import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


function FormComponent() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    locationError: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  
  const validate = () => {
    let nameError = '';
    let emailError = '';
    let passwordError = '';
    let locationError = '';

    if (!formData.name) {
      nameError = 'Name is required';
    } else if (formData.name.length < 3) {
      nameError = 'Name must be at least 3 characters';
    }

    if (!formData.email) {
      emailError = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      emailError = 'Invalid email address';
    }

    if (!formData.password) {
      passwordError = 'Password is required';
    } else if (formData.password.length < 8) {
      passwordError = 'Password must be at least 8 characters';
    }

    if (!formData.location) {
      locationError = 'Location is required';
    }

    if (nameError || emailError || passwordError || locationError) {
      setErrors({ nameError, emailError, passwordError, locationError });
      return false;
    }

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      axios.post('http://localhost:5000/register', formData)
      .then(res => setMessage("User added successfully"))
      .catch(err => setMessage(`Error: ${err.message}`));
    }
    
  }

  return (
    <div className='container col-lg-4 col-md-2 col-sm-1 d-flex align-items-center justify-content-center'>
     {
      message.length !== 0 ? <h3>{message}</h3> :
      <Form onSubmit={handleSubmit} className="mx-5 my-5">
      <Form.Group controlId="formBasicEmail">
       
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
      </Form.Group>
      <div style={{ color: 'red' }}>{errors.emailError}</div>
      <Form.Group controlId="formBasicPassword">
       
        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
      </Form.Group>
      <div style={{ color: 'red' }}>{errors.passwordError}</div>
      <Form.Group controlId="formBasicName">
       
        <Form.Control type="text" placeholder="Name" name="name" onChange={handleChange}/>
      </Form.Group>
      <div style={{ color: 'red' }}>{errors.nameError}</div>
      <Form.Group controlId="formBasicLocation">
        
        <Form.Control type="text" placeholder="Location" name="location" onChange={handleChange}/>
      </Form.Group>
      <div style={{ color: 'red' }}>{errors.locationError}</div>
      <Button variant="primary" type="submit" className="my-2">
        Submit
      </Button>
    </Form>
     }
   
    
    </div>
  );
}

export default FormComponent;
