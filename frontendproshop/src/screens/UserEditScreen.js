import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {Form, Button,  FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetails, updateUser} from "../actions/UserActions";
import FormContainer from "../components/FormContainer";
import {userUpdateReducer} from "../reducers/userReducers";
import {USER_UPDATES_RESET} from "../constants/userConstants";


function EditUserScreen({match, history}) {

    const userId = match.params.id

    const  [name, setName] = useState('')
    const  [email, setEmail] = useState('')
    const  [isAdmin, setIsAdmin] = useState('false')


    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = userUpdate

    useEffect(() => {
        if (successUpdate){
            dispatch({type: USER_UPDATES_RESET})
            history.push('/admin/userlist')
        }else{
            if (!user.name || user._id !== Number(userId)){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)

            }
        }


    },[user,userId, successUpdate,history])//dependencies

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id,name, email,isAdmin}))

    }
    return(
        <div>
            <Link to={`/admin/userlist`}>
                Go back
            </Link>
            <FormContainer>
            <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
                    :
                    (
                        <Form onSubmit={submitHandler}>

                         <FormGroup controlId={name}>
                            <Form.Label>name</Form.Label>
                            <Form.Control
                            type='name'
                            placeholder='enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            >

                            </Form.Control>

                        </FormGroup>
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
                         <FormGroup controlId={isAdmin}>
                            <Form.Check
                            type='checkbox'
                            lable="Is admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            >

                            </Form.Check>
                        </FormGroup>


                        <Button type='submit' variant='primary'>Update</Button>

                        </Form>
                    )}




        </FormContainer>

        </div>

)}
export default EditUserScreen