import React, {useState,useEffect} from "react";
import {Router} from "react-router-dom";

import {Link} from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Row, Col, Button, Card, ListGroup, Image, ListGroupItem, Form} from "react-bootstrap";
import Rating from "../components/Rating";
// import Product from "../components/Product";
// import products from "../products";
import {useDispatch,useSelector} from "react-redux";
import {listProductDetails, createProductReview} from "../actions/productActions";
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants";

function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    // const product = products.find((p) => p._id === match.params.id)\
    const  dispatch =useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading:loadingProductReview,
        error:errorProductReview,
        success:successProductReview
    } = productReviewCreate



    useEffect(()=>{
        if (successProductReview){
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))

    },[dispatch,match,successProductReview] )
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)

    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
                rating,
                comment//sending the data to the back end
            }
        ))
      
    }
    return(
        <div>
            <Link to='/' className='btn btn-light my-3'> Go Back</Link>
            {loading ? <Loader/>
            : error ?
                    <Message variant='danger'>{error}</Message>
                    :(
                        <div>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid/>

                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <h3>{product.name}</h3>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"}/>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Price:ksh{product.price}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Description:{product.description}
                                    </ListGroupItem>

                                </ListGroup>

                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong>ksh {product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'in stock' : 'out of stock' }
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                        {product.countInStock > 0 &&(
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>
                                                        Qty
                                                    </Col><Col xs='auto' className='my-1'>
                                                    <Form.Control as='select'
                                                                  value={qty}
                                                                  onChange={(e) =>
                                                                      setQty(e.target.value)}

                                                    >{
                                                        [...Array(product.countInStock).keys()].map((x) =>(
                                                            <option key={x + 1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        ))
                                                    }

                                                    </Form.Control>
                                                </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )}
                                        <ListGroupItem>
                                            <Button onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.countInStock===0}
                                                    type='button'>Add to Cart
                                            </Button>
                                        </ListGroupItem>

                                    </ListGroup>
                                </Card>

                            </Col>
                        </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    {product.reviews.length === 0 && <Message variant='info'>No reviws</Message> }
                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) =>(
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color={'#f8e825'}/>
                                                <p>{review.createdAt}</p>
                                                <p>{review.comment}</p>

                                            </ListGroup.Item>
                                        ))}
                                        <ListGroupItem>
                                            <h4>write  review</h4>
                                            {loadingProductReview && <Loader/>}
                                            {successProductReview && <Message variant='success'>Review submitted</Message> }
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message> }

                                            {userInfo ? (
                                                <form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>
                                                            Rating
                                                        </Form.Label>
                                                        <Form.Control as='select'
                                                                      value={rating}
                                                                      onChange={(e) =>
                                                                          setRating(
                                                                          e.target.value)}
                                                        >
                                                            <option value=''>select..</option>
                                                            <option value='1'>1-poor..</option>
                                                            <option value='2'>2-fair..</option>
                                                            <option value='3'>3-good..</option>
                                                            <option value='4'>4-very good..</option>
                                                            <option value='5'>5-excellent..</option>

                                                        </Form.Control>

                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>
                                                            review
                                                        </Form.Label>
                                                        <Form.Control
                                                             as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(
                                                                e.target.value
                                                            )}
                                                        >good</Form.Control>
                                                        <Button
                                                            disabled={loadingProductReview}
                                                            type='submit'
                                                            variant='primary'
                                                        >Submit</Button>
                                                    </Form.Group>
                                                </form>
                                            ):(
                                                <Message variant='info'>Please <Link to='/login'>login</Link> To write a review</Message>
                                            )}
                                        </ListGroupItem>
                                    </ListGroup>


                                </Col>
                            </Row>
                        </div>

                    )
            }

        </div>
    )

}
export default ProductScreen