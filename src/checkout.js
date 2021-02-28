import React from "react";
import {useHistory} from "react-router-dom";
import "./checkout.css";
import {UseContextValue} from "./contextProvider";
import {TotalPrice} from "./reducer";
import ProductsCheckout from "./productCheck";

function Checkout(){
const [{cart,user}] = UseContextValue();
const history = useHistory();
function payment(e){
if(user){
history.push("/payment")
}
else{
alert("Please Sign in for Confirm order");
history.push("/login");
}
}
return(
<div className="checkoutMain">
<>
<div className="checkoutHeader">
<img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="offer banner" />

<div className="billing">
<p>Subtotal<strong>({cart?.length}) Total: ₹{TotalPrice(cart).toFixed(2)}</strong></p>
<small className="subtotal__gift">
<input type="checkbox" /> This order contains a gift
</small>
<button onClick={payment}>Proceed To Checkout</button>
</div>

</div>

<div className="checkoutProducts">
<h4 style={{fontWeight:"500"}}>Hlo {user && user?.email}</h4>
<hr />
<h2> Your Shopping Basket</h2>
<div className="main">
{cart?.map(item => (
<ProductsCheckout 
id ={item.id}
title={item.title}
image ={item.image}
price={item.price}

/>
))}
</div>
</div>
</>
</div>
)
};

export default Checkout;