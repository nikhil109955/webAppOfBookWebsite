import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

function PaymentMethodScreen() {
 
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const{
        cart: { shippingAddress, paymentMethod},
    } = state;

    const [PaymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
    );
    useEffect(()=>{
       if(!shippingAddress.address){
        console.log(shippingAddress)
        navigate('/shipping')
       } 
    },[shippingAddress, navigate]);
    const submitHandler = (e) =>{
        e.preventDefault();
        ctxDispatch({type:'SAVE_PAYMENT_METHOD', payload: PaymentMethodName});
        localStorage.setItem('paymentMethod', PaymentMethodName);
        navigate('/placeorder');  
        window.location.reload()
    };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className='container small-container'>
        <Helmet>
            <title>Payment Method</title>
        </Helmet>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
        <div className='mb-3'> 
            <Form.Check
            type='radio'
            id='PayPal'
            label='PayPal'
            value='PayPal'
            checked={PaymentMethodName==='PayPal'}
            onChange={(e)=>setPaymentMethod(e.target.value)}
             />
            </div>
            <div className='mb-3'> 
            <Form.Check
            type='radio'
            id='Stripe'
            label='Stripe'
            value='Stripe'
            checked={PaymentMethodName==='Stripe'}
            onChange={(e)=>setPaymentMethod(e.target.value)}
             />
            </div>
            <div className='mb-3'>
                <Button type ='submit'>Continue</Button>
            </div>
        </Form>
      </div>
    </div>
  )
}

export default PaymentMethodScreen;
