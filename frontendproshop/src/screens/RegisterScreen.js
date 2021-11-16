import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {Form, Button, Row, Col, FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {login, register} from "../actions/UserActions";
import FormContainer from "../components/FormContainer";


function RegisterScreen({location, history}) {
    const  [name, setName] = useState('')
    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')
    const  [confirmPassword, setConfirmPassword] = useState('')
    const  [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const  redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo){
            history.push(redirect)

        }
    },[history,userInfo, redirect])//dependencies

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage("pass words dont match")
        }else {
            dispatch(register(name,email,password))

        }
    }
    return(
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                 <FormGroup controlId={name}>
                    <Form.Label>name</Form.Label>
                    <Form.Control
                    type='name'
                    required
                    placeholder='enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                 <FormGroup controlId={email}>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                        required
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
                    required
                    placeholder='enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                <FormGroup controlId={confirmPassword}>
                    <Form.Label> confirm Pass word</Form.Label>
                    <Form.Control
                    type='password'
                    required
                    placeholder='confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                <Button type='submit' variant='primary'>Register</Button>

            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account ? <Link
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>sign in</Link>
                </Col>

            </Row>



        </FormContainer>
    )

}
export  default RegisterScreen