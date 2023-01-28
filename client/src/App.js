import './App.css'
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormComponent from './Components/FormComponent';
import JobPostings from './Components/JobPostings';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from './Features/DataSlice';
import Job from './Components/Job';
import JobForm from './Components/JobForm';
import NewMessageForm from './Components/NewMessageForm';
import NavigationBar from './Components/NavigationBar';




function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
        <NavigationBar />

        <Routes>
          <Route path='/register' element={<FormComponent />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Jobs' element={<JobPostings />} />
          <Route path='/Job/:id' element={<Job />} />
          <Route path='/jobform' element={<JobForm />} />
          <Route path='/message' element={<NewMessageForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
