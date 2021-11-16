import React, {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {Row,Col} from "react-bootstrap";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import {listProducts} from "../actions/productActions";

function HomeScreen({history}) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const{error,loading,products, page, pages} = productList
    let keyword = history.location.search
    // console.log(keyword)
    useEffect(() =>{
        dispatch(listProducts(keyword))

    },[dispatch, keyword])

    return(
        <div>
            {!keyword && <ProductCarousel/>}
            <h2>latest products updated</h2>
            {loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product =>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                             </Col>
                        ))}
                    </Row>
                        <Paginate page={page} pages={pages} keyword={keyword}/>
                    </div>
            }

        </div>
    )

}
export default HomeScreen

