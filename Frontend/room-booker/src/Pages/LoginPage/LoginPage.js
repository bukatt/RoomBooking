import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from "../../Store/auth/authSlice";
import { Navigate } from 'react-router-dom';


function LoginPage() {
    const [formValues, setFormValues] = useState({password: "", email: ""})
    const dispatch = useDispatch()
    const { user, loginState } = useSelector(state => state.auth)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setFormValues(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        if (event){
            event.preventDefault();
        }
        dispatch(userLogin({username: formValues.email, password: formValues.password}));
    };

    if(loginState === "loggedIn"){
        return  <Navigate to='/my-bookings' />
    }

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={formValues.email} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
                    </Form.Group>
                    <Button href="/sign-up" variant="link">
                        Sign Up
                    </Button>
                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                </Form>
            </Card.Body>
        </Card>

    );
  }
  
  export default LoginPage;