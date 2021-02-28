import React from "react";
import "./productcheck.css";
import {UseContextValue} from "./contextProvider";


function ProductsCheckout({title,id,image,price}){

const [{cart}, dispatch] = UseContextValue();
function removeCart(){
dispatch(
{type:"Remove_Cart", id:id})
}

return(
<div className="checkoutHeader">
<div className="checkoutImage">
<img src={image} alt="product" />
</div>
<div className="checkoutInfo">
<h3>{title}</h3>
<h4>Price: ₹{price}</h4>
<button onClick={removeCart}>Remove From Cart </button>
</div>
</div>
)
};


export default ProductsCheckout;