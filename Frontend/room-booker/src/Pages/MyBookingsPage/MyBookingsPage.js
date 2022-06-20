import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux'
import axios from "axios";
import Endpoints from "../../Endpoints/Endpoints";
import { Navigate } from 'react-router-dom';

function MyBookingsPage() {
    const [formValues, setFormValues] = useState({password: '', email: '', first_name: '', last_name: ''})
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues(values => ({...values, [name]: value}))
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(Endpoints.user)
        axios.post(Endpoints.user, formValues).then( res => {
            console.log(res)
            return <Navigate to='/login' />
        });
    };

    return (
        <Card>
            <Card.Body>
                Welcome
            </Card.Body>
        </Card>
    );
  }
  
  export default MyBookingsPage;