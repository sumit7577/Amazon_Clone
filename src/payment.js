import React,{useState,useEffect} from "react";
import ProductsCheckout from "./productCheck";
import {UseContextValue} from "./contextProvider";
import "./payment.css";
import {Link,useHistory} from "react-router-dom";
import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import {TotalPrice} from "./reducer";
import axios from "./axios";
import {db} from "./firebase";


function Payment(){
const [{cart,user},dispatch] = UseContextValue();
const history = useHistory();
const stripe = useStripe();
const elements = useElements();
const [succeeded, setSucceded] = useState(false);
const [processing, setProcessing] = useState("");
const [error, setError] = useState(null);
const [disabled, setDisabled] = useState(true);
const [clientSecret, setClientSecret] = useState(true);

useEffect(()=>{
const getClientSecret = async () =>{
const response = await axios({
method:"post",
url: `payments/create?total=${TotalPrice(cart).toFixed(2)*100}`
});
setClientSecret(response.data.clientSecret)
}
getClientSecret()
},[cart]);

function handleChange(event){
// and display any errors as the customer types their card details
setDisabled(event.empty);
setError(event.error ? event.error.message : "");
}

const handleSubmit = async(event)=>{
event.preventDefault();
setProcessing(true);
const payload = await stripe.confirmCardPayment(clientSecret,{
payment_method: {
card : elements.getElement(CardElement)
}}).then(({paymentIntent}) =>{
db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({cart:cart, amount:paymentIntent.amount, created: paymentIntent.created})
setSucceded(true)
setError(null)
setProcessing(false)
dispatch({type:"Empty_Basket"})
history.replace("/orders")
}).catch((error)=>{
alert("Sorry, We are facing some techinal issue")
});
}

return(
<div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{cart?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Street</p>
                        <p>India, Bihar</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {cart.map(item => (
                            <ProductsCheckout
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
</div>

<div className='payment__section' className="orderConfirm">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                            {/* Stripe magic will go */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                            <h3>Order Total: ₹{TotalPrice(cart).toFixed(2)}</h3>
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
</div>
)


};

export default Payment;