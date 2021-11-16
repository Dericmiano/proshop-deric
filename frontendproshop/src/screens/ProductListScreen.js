import React,{useState,useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Form, Button, Row, Col, FormGroup, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {listProducts, deleteProduct, createProduct} from "../actions/productActions";
import products from "../products";
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";

function ProductListScreen({history, match }) {
    const  dispatch = useDispatch()
    const  productList = useSelector(state => state.productList)
    const {loading, products, error,page, pages} = productList

    const  productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, success:successDelete, error:errorDelete} = productDelete

    const  productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, success:successCreate, error:errorCreate, product:createdProduct} = productCreate

    const  userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    let keyword = history.location.search


    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin){
            history.push('/login')
        }
        if (successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)

        }else{
            dispatch(listProducts(keyword))
        }

    },[dispatch, history, userInfo,successDelete, successCreate, createdProduct,keyword])


    const deleteHandler = (id) => {
        if (window.confirm("Are you ready to delete the user?")){
            dispatch(deleteProduct(id))
                //delete products
        }

    }
    const createProductHandler = () => {
        dispatch(createProduct())
        //create product
      
    }

    return(
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'/> Create product</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message> }

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message> }

            {loading ? (
                <Loader/>
                )
            : error ?(
                            <Message variant='danger'>{error}</Message>
                ):
                    (
                        <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>


                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit' />

                                                </Button>

                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() =>
                                                deleteHandler(product._id)}>
                                                    <i className='fas fa-trash' />
                                                </Button>
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                            <Paginate pages={pages} page={page} isAdmin={true}/>
                        </div>

                    )
            }

        </div>
    )

}
export default ProductListScreen