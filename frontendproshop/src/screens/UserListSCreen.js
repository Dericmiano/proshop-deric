import React,{useState,useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Form, Button, Row, Col, FormGroup, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listUsers, deleteUser} from "../actions/UserActions";

function UserListSCreen({history}) {
    const  dispatch = useDispatch()
    const  userList = useSelector(state => state.userList)
    const {loading, users, error} = userList
    const  userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const  userDelete = useSelector(state => state.userDelete )
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin){
            dispatch(listUsers())

        }else{
            history.push('/login')
        }

    },[dispatch, history, successDelete, userInfo])

    
    const deleteHandler = (id) => {
        if (window.confirm("Are you ready to delete the user?")){
            dispatch(deleteUser(id))

        }

    }

    return(
        <div>
            <h1>users</h1>
            {loading ? (
                <Loader/>
                )
            : error ?(
                            <Message variant='danger'>{error}</Message>
                ):
                    (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{color:'green'}}/>
                                        ):(
                                            <i className='fas fa-check' style={{color:'red'}}/>

                                            )
                                            }</td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit' />

                                                </Button>

                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() =>
                                                deleteHandler(user._id)}>
                                                    <i className='fas fa-trash' />
                                                </Button>
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    )
            }

        </div>
    )

}
export default UserListSCreen