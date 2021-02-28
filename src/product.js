import React from "react";
import "./products.css";
import {UseContextValue} from "./contextProvider";

function Products({id,title,price,image}){
const [{cart}, dispatch] = UseContextValue();
function addBasket(){
dispatch({type:"Add_Basket",
item:{
id:id,
title:title,
price:price,
image:image,
},
});

};
return(
<div className="productBody">
<div className="productInfo">
<h3>{title}</h3>
<h4>price: ₹{price}</h4>
<div className="productImage">
<img src={image} alt="product" />
</div>
<button onClick={addBasket}>Buy Me</button>
</div>

</div>
)
};

export default Products;