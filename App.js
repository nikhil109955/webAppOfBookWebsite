import './App.css';
import ProductScreen from './screens/ProductScreen';
import {Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import reactLogo from './images/reactLogo.png';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingAddress from './screens/ShippingAddress';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';



function App() {
  const { state, dispatch: ctxDispatch} = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () =>{
    ctxDispatch({type:'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };


  return (
    <div className='d-flex flex-column site-container'>
    <header className="App-header">
    <Navbar bg='dark' variant='dark' expand="lg ">
      <Container>
        <Navbar.Brand><img src={reactLogo} height='65' alt=''></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id = "basic-navbar-nav">
        <Nav className = 'me-auto w-100 justify-content-end'>
          <Link to = '/cart' className='nav-link'>
            Cart
            {
              cart.cartItems.length > 0 && (
                <Badge pill bg = 'danger'>
                  {cart.cartItems.reduce((a,c)=> a + c.quantity, 0 )}
                </Badge>
              )
            }
          </Link>
          {userInfo ? (
            <NavDropdown title ={userInfo.name} id="basic-nav-dropdown">
            <li>
              <Link to ="/profile">
                <NavDropdown.Item>User Profile</NavDropdown.Item>
              </Link>
              <Link to ="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider/>
              <Link 
                className="dropdown-item"
                to="#signout"
                onClick={signOutHandler}>
                  Sign out
                </Link>
                </li>


            </NavDropdown>
          ):(
            <Link className="nav-link" to="/signin">
            Sign In
            </Link>
          )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <h1 className='featBook'>FEATURED BOOKS</h1>
      </header>
      <main>
      <Container className='mt-3'>
      <Routes>
        <Route path = "/product/:slug" element = {<ProductScreen/>} />
        <Route path = "/cart" element = {<CartScreen/>} />
        <Route path = "/signin" element = {<SignInScreen/>} />
        <Route path = "/signup" element = {<SignupScreen/>} />
        <Route path = "/profile" element = {<ProfileScreen/>} />
        <Route path = "/shipping" element = {<ShippingAddress/>} />
        <Route path = "/payment" element = {<PaymentMethodScreen/>}/>
        <Route path = "/placeorder" element = {<PlaceOrderScreen/>}/>
        <Route path = "/order/:id" element = {<OrderScreen/>}/>
        <Route path = "/orderhistory" element = {<OrderHistoryScreen/>} />
        <Route path = "/" element = {<HomeScreen/>} />
      </Routes>
    </Container>
    </main>
    <footer>
      <div className='text-center'>All rights reserved</div>
    </footer>
    </div>
  )}
    

export default App;
