import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Pagination from './Pagination';
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const JobPostings = () => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const navigate = useNavigate()

    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const jobs = useSelector(state=>state.data.jobs)
    const loading = useSelector(state=>state.data.isLoading)

    if(!isLoggedIn){
        return <Navigate to='/login'/>
    }

    
    

    

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem);



    return (
        <div>
        { loading ? <h3>Loading...</h3> :

                <div className='container'>
                    <h3 className='d-flex align-items-center justify-content-center'>Jobs</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((job) => (
                                <tr key={job._id}>
                                    <td>{job.Title}</td>
                                    <td>{job.Company}</td>
                                    <td><Button 
                                        variant="primary" 
                                        onClick={()=>navigate('/Job/'+job._id)}
                                        > Show More </Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination 
                        itemsPerPage={itemsPerPage}
                        totalItems={jobs.length}
                        paginate={handlePageChange}
                        currentPage={currentPage}
                    />

                </div>
}
                </div>
    );
}

export default JobPostings;
