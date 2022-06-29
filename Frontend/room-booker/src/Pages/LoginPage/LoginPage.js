import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from "react-bootstrap/Stack";
import { useSelector } from 'react-redux'
import { userLogin } from "../../Store/auth/authSlice";
import { Navigate } from 'react-router-dom';
import { Container } from "react-bootstrap";
import "./LoginPage.css"
import { LoginState } from "../../Enums/LoginState";
import { useAppDispatch } from "../../Store/store";

function LoginPage() {
    const [formValues, setFormValues] = useState({password: "", email: ""})
    const dispatch = useAppDispatch()
    const { user, loginState } = useSelector((state) => state.auth)

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

    if(loginState === LoginState.LoggedIn){
        return  <Navigate to='/room-bookings' />
    }

    const showError = () => {

    }

    return (
        <Container className="flex-justify-center">
        <Card style={{ width: '18rem', backgroundColor: '#F5F5F5' }}>
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
                    <Stack direction="horizontal" gap={3}>
                    <Button href="/sign-up" variant="link">
                        Sign Up
                    </Button>
                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                    </Stack>
                </Form>
            </Card.Body>
        </Card>
        </Container>
    );
  }
  
  export default LoginPage;