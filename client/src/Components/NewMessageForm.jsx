import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../Features/MessageSlice';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const NewMessageForm = () => {
const dispatch = useDispatch();

const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
const sender = useSelector(state=>state.user.details)

if(!isLoggedIn){
    return <Navigate to='/login'/>
}

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMessage = {
        sender: formData.get("sender"),
        receiver: formData.get("receiver"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    };
    dispatch(sendMessage(newMessage));
};

return (

    <div className="container">
        <h1>Message Center</h1>
        <form onSubmit={handleSubmit} className='formContainer'>

            <input type="text" value={sender.email} name="sender" id="sender" required placeholder='sender' className='my-1'/>
            <input type="text" name="receiver" id="receiver" required placeholder='receiver' className='my-1'/>
            <input type="text" name="subject" id="subject" required placeholder='subject' className='my-1'/>
            <textarea rows="3" name="message" id="message" required placeholder='Your Message' className='my-1'/>
            <Button variant="primary" type="submit" className="my-2"> Send </Button>
        </form>
    </div>
);
}
export default NewMessageForm;