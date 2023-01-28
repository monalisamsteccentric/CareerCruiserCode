import React from 'react'
import { Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'





const Job = () => {

const params = useParams()    
const jobs = useSelector(state=>state.data.jobs)
const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
let job = jobs.filter((job)=> job._id === params.id)

if(!isLoggedIn){
  return <Navigate to='/login'/>
}



    
  return (
    <div className='container'>
        <h3>{job[0].Title}</h3>
        <p><span style={{ fontWeight: 'Bold'}}>About Company:</span> {job[0].AboutC}</p>
        <p> <span style={{ fontWeight: 'Bold'}}>Application Points:</span> {job[0].ApplicationP}</p>
        <p> <span style={{ fontWeight: 'Bold'}}>Job Description:</span> {job[0].JobDescription}</p>
        <p> <span style={{ fontWeight: 'Bold'}}>Application Points:</span> {job[0].ApplicationP}</p>
        <p> <span style={{ fontWeight: 'Bold'}}>Job Post:</span> {job[0].jobpost}</p>
        <Button variant="primary" type="submit" className="my-2"> Apply </Button>
    </div>
  )
}

export default Job