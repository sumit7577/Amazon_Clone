import React,{useEffect} from "react";
import Header from "./header";
import "./app.css";
import Body from "./body";
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Checkout from "./checkout";
import Login from "./login";
import {auth} from "./firebase";
import {UseContextValue} from "./contextProvider";
import Payment from "./payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const promise = loadStripe("pk_test_51HpQavLo9p3SVh7eOClO69TFk12K8XQAoDWwjoww6tPw8hsSJommJMfe2hMxtQef9DRArVwu1wrdeWTcXNtyjkOE00n0IgeqT4");

function App(){
const [{},dispatch] = UseContextValue();

useEffect(()=>
auth.onAuthStateChanged((authUser)=>{

if(authUser){
dispatch({type:"Sign_In",user:authUser});
}
else{
dispatch({type:"Sign_In",user:null});
}
}),[]);
return(
<div className="app">

<Router>
<Switch>
<Route path="/payment">
<Header />
<Elements stripe={promise}>
<Payment />
</Elements>
</Route>
<Route path="/login">
<Login />
</Route>
<Route path="/checkout">
<Header />
<Checkout />
</Route>
<Route path="/">
<Header />
<Body />
</Route>
</Switch>
</Router>

</div>
)
};

export default App;