import './App.css';
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import {HashRouter as Router, Route} from "react-router-dom";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListSCreen from "./screens/UserListSCreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListSCreen from "./screens/OrderListScreen";

function App() {
  return (
    <Router >
        <Header/>
      <main className='py-3'>
          <Container>
              <Route path='/' component={HomeScreen} exact/>
              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />

              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeOrder' component={PlaceOrderScreen} />
              <Route path='/order/:id' component={OrderScreen}/>

              <Route path='/product/:id/' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/admin/userlist' component={UserListSCreen} />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} />
              <Route path='/admin/productlist' component={ProductListScreen} />
              <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
              <Route path='/admin/orderlist' component={OrderListSCreen} />









              {/*<HomeScreen/>*/}
          </Container>
      </main>
        <Footer/>
    </Router>
  );
}

export default App;
