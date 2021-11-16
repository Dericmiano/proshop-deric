import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {Form, Button, Row, Col, FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {login} from "../actions/UserActions";
import FormContainer from "../components/FormContainer";


function LoginScreen({location, history}) {
    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const  redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo){
            history.push(redirect)

        }
    },[history,userInfo, redirect])//dependencies

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

    return(
        <FormContainer>
            <h1>sign in</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId={email}>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>


                <FormGroup controlId={password}>
                    <Form.Label>Pass word</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                <Button type='submit' variant='primary'>sign in</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New customer? <Link
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>

            </Row>

        </FormContainer>
    )

}
export default LoginScreen