
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserDetails } from '../Features/UserSlice';
import { setLoggedOut } from '../Features/AuthSlice';
import { Navbar, Nav, Form, Button, NavDropdown } from 'react-bootstrap';

const NavigationBar = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const isloggedin = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        console.log(token);
        dispatch(fetchUserDetails(token));
    }, [token, dispatch]);

    const clickHandler = () => {
        localStorage.clear();
        dispatch(setLoggedOut());
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/" className="custom-link fontStyle">CareerCruiser</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isloggedin ? (
                        <>
                            <Nav.Link as={Link} to="/jobform" className='custom-link'>Resume</Nav.Link>
                            <Nav.Link as={Link} to="/jobs" className='custom-link'>Jobs</Nav.Link>
                            <NavDropdown title="Mail" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/inbox" className='custom-link'>Inbox</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/outbox" className='custom-link'>Outbox</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/message" className='custom-link'>Compose</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : null}
                </Nav>
                {isloggedin ? (
                    <>
                        <Form inline>
                            <Button variant="danger" onClick={clickHandler}>
                                Logout
                            </Button>
                        </Form>
                    </>
                ) : (
                    <>
                        <Form inline>
                            <Button variant="outline-success" as={Link} to="/login" className='custom-link'>
                                Login
                            </Button>{' '}
                            <Button variant="outline-success" as={Link} to="/register" className='custom-link'>
                                Register
                            </Button>
                        </Form>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;