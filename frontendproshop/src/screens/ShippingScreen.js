import React,{useState,useEffect} from "react";
import {Form, Button, FormGroup,} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import {saveShippingAddress} from "../actions/CartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen({history}) {
    const  cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()


    const  [address, setAddress] = useState(shippingAddress.address)
    const  [city, setCity] = useState(shippingAddress.city)
    const  [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const  [country, setCountry] = useState(shippingAddress.country)
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
        // console.log("submitted")

    }


    return(
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId={address}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    type='text'
                    required
                    placeholder='enter address'
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                 <FormGroup controlId={city}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                    type='text'
                    required
                    placeholder='enter city'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                 <FormGroup controlId={postalCode}>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                    type='text'
                    required
                    placeholder='enter PostalCode'
                    value={postalCode ? postalCode : ''}
                    onChange={(e) => setPostalCode(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                 <FormGroup controlId={country}>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    type='text'
                    required
                    placeholder='enter Country'
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)}
                    >

                    </Form.Control>

                </FormGroup>
                <Button type='submit' variant='primary'>
                    continue
                </Button>




            </Form>

        </FormContainer>
    )

}
export  default  ShippingScreen