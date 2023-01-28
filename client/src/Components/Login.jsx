import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../Features/AuthSlice';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        dispatch(setLoggedIn())
        navigate('/home')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="parent">
      <Form onSubmit={handleSubmit}>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder='email' />
        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required placeholder='password' />
        <Button variant="primary" type="submit" className="my-2"> Login </Button>
      </Form>
    </div>
  );
}

export default Login;
