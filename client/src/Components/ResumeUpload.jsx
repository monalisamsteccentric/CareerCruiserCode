import React, { useState } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)

  if(!isLoggedIn){
    return <Navigate to='/login'/>
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    const token = localStorage.getItem("token"); // get the token from local storage
    if(!token) {
      setError("Please log in before uploading file");
      return;
    }
    
    
    const formData = new FormData();
    formData.append("resume", file);
    console.log(file)
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "content-type": 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          
        },
      });
      switch(res.status) {
        case 200:
          console.log("file uploaded");
          break;
        case 401:
          setError("Unauthorized access. Please login again.")
          break;
        case 500:
          setError("Internal server error. Please try again later.")
          break;
        default:
          setError("Failed to upload file. Please try again later.")
      }
     
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} name="resume" className="text-white"/>
      <Button variant="primary" type="submit" className="my-2"> Upload </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default ResumeUpload;
