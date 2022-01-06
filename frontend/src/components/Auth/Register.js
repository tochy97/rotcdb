import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { Card, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { createUser, setError } from '../../redux/actionCreators/authActionCreator';

function Register() {
    const [username,setUsername] = useState("");
    const [cusername,setCusername] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCpassword] = useState("");

    const dispatch = useDispatch();
    const histroy = useNavigate();
    
    const { error, status } = useSelector(
        (state) =>({
          error:state.auth.error, 
          status:state.auth.status, 
    }), shallowEqual);

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        for (let i = 0; i < str.length; i++) {
            if(isNaN(str[i]) && isNaN(parseFloat(str[i]))){
                return false;
            }
        }
        return true;
    }

    function handleSubmit(e){
        e.preventDefault();
        const info= {
            error:"",
        }
        dispatch(setError(info));
        if(!isNumeric(username)){
            const info= {
                error:"ID number must be numbers",
            }
            dispatch(setError(info));
            return;
        }
        if(password.localeCompare(cpassword) !== 0){
            const info= {
                error:"Last 4 digits did not match",
            }
            dispatch(setError(info));
            return;
        }
        if(username.localeCompare(cusername) !== 0 ){
            const info= {
                error:"ID numbers did not match",
            }
            dispatch(setError(info));
            return;
        }
        const data = {
            username: username,
            password: password
        }
        if(error){
            return;
        }
        dispatch(createUser(data));
        histroy("../SetAccount", {replace:true});
    }

    return (
        <Card className="py-4" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                <Divider className="font-weight-bold text-center py-4"><h1>Register</h1></Divider>
                {error && status !== 401 && <Alert variant="danger">{error}</Alert>}
                <Col lg={10}  className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Floating id="username" style={{marginTop: "1rem"}} >
                            <Form.Control type="text" placeholder="ID Number" value={username} onChange={e=>setUsername(e.target.value)} required></Form.Control>
                            <Form.Label>ID Number</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="cusername" style={{marginTop: "1rem"}} >
                            <Form.Control type="text" placeholder="Confirm ID number" value={cusername} onChange={e=>setCusername(e.target.value)} required></Form.Control>
                            <Form.Label>Confirm ID number</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="password" style={{marginTop: "1rem"}} >
                            <Form.Control type="password" placeholder="Last 4 digits of ID" value={password} onChange={e=>setPassword(e.target.value)} required></Form.Control>
                            <Form.Label>Last 4 digits of ID</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="cpassword" style={{marginTop: "1rem"}} >
                            <Form.Control type="password" placeholder="Confirm last 4 digits of ID" value={cpassword} onChange={e=>setCpassword(e.target.value)} required></Form.Control>
                            <Form.Label>Confirm last 4 digits of ID</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Register</Button>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}

export default Register;