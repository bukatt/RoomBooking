import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Endpoints from "../../Endpoints/Endpoints";
import { Navigate } from 'react-router-dom';
import { Container, Stack } from "react-bootstrap";

function SignUpPage() {
    const [formValues, setFormValues] = useState({password: '', email: '', first_name: '', last_name: ''});
    const [validated, setValidated] = useState(false);
    const [successfulSubmission, setSuccessfulSubmission] = useState(false);
    const [emailInUse, setEmailInUse] = useState(false);
    
    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues(values => ({...values, [name]: value}))
    };

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            console.log("validity")
            event.preventDefault();
            axios.post(Endpoints.user, formValues).then( res => {
                setSuccessfulSubmission(true);
                setValidated(true);
            },
            err => {
                if(err.response?.data?.detail === "Email already registered"){
                    setEmailInUse(true);
                }
                setValidated(true);
            });
        }
    };

    if(successfulSubmission){
        return <Navigate to='/login' />
    }

    const checkInValidEmail = () => {
        const emailParsed = formValues.email.split('@');
        if(emailParsed.length > 1){
            const domain = emailParsed[1]
            return (domain !== "coke.com" && domain !== "pepsi.com" && validated) || (validated && emailInUse);
        } else {
            return validated;
        }
    }

    const emailValidationText = () => {
        return emailInUse ? "Email has already been registered. Please try again." : "Please enter a valid email.";
    }

    return (
        <Container className="flex-justify-center">
        <Card style={{ width: '18rem', backgroundColor: '#F5F5F5' }}>
            <Card.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control isInvalid={checkInValidEmail()} required type="email" name="email" placeholder="Enter email" value={formValues.email} onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                        {emailValidationText()}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" name="first_name" placeholder="First Name" value={formValues.first_name} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" name="last_name" placeholder="Last Name" value={formValues.last_name} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
                    </Form.Group>
                    <Stack direction="horizontal" gap={3}>
                    <Button href="/login" variant="link">
                        Login
                    </Button>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                    </Stack>
                </Form>
            </Card.Body>
        </Card>
        </Container>
    );
  }
  
  export default SignUpPage;