import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux'
import axios from "axios";
import Endpoints from "../../Endpoints/Endpoints";
import { Navigate } from 'react-router-dom';
import { Container } from "react-bootstrap";

function SignUpPage() {
    const [formValues, setFormValues] = useState({password: '', email: '', first_name: '', last_name: ''})
    const dispatch = useDispatch()

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(Endpoints.user)
        axios.post(Endpoints.user, formValues).then( res => {
            console.log(res)
            return <Navigate to='/login' />
        });
    };

    return (
        <Container className="flex-justify-center">
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" value={formValues.email} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" placeholder="First Name" value={formValues.first_name} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last_name" placeholder="Last Name" value={formValues.last_name} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
                    </Form.Group>
                    <Button href="/login" variant="link">
                        Login
                    </Button>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        </Container>
    );
  }
  
  export default SignUpPage;