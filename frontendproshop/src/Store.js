import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {productDetailsReducer} from "./reducers/productReducers";
import {productListReducer} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {userLoginReducer} from "./reducers/userReducers";

import {composeWithDevTools} from "redux-devtools-extension";
import {userRegisterReducer} from "./reducers/userReducers";
import {userDetailsReducer} from "./reducers/userReducers";
import {userUpdateProfileReducer} from "./reducers/userReducers";
import {orderCreateReducer} from "./reducers/orderReducers";
import {orderDetailsReducer} from "./reducers/orderReducers";
import {orderPayReducer} from "./reducers/orderReducers";
import {orderListMyReducer} from "./reducers/orderReducers";
import {userListReducer} from "./reducers/userReducers";
import {userDeleteReducer} from "./reducers/userReducers";
import {userUpdateReducer} from "./reducers/userReducers";
import {productDeleteReducer} from "./reducers/productReducers";
import {productCreateReducer} from "./reducers/productReducers";
import {productUpdateReducer} from "./reducers/productReducers";
import {orderListReducer} from "./reducers/orderReducers";
import {orderDeliverReducer} from "./reducers/orderReducers";
import {productReviewCreateReducer} from "./reducers/productReducers";
import {productTopRatedReducer} from "./reducers/productReducers";

const reducer = combineReducers({
    productList:productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    userDelete:userDeleteReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer,

})
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}



const initialState = {
    cart: {
        cartItems:cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin :{userInfo:userInfoFromStorage},

}


const  middleware = [thunk]
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store












