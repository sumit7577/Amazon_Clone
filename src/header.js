import React from "react";
import "./header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from "react-router-dom";
import {UseContextValue} from "./contextProvider";
import {auth} from "./firebase";
function Header(){
const [{cart,user}] = UseContextValue();
function signOut(){
if(user){
auth.signOut();
alert("Succesfully Signed out");
}

}
return(
<div className="mainHeader">
<div className="img">
<Link to = "/">
<img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon" />
</Link>
</div>

<div className="search">
<input placeholder="search.." />
<SearchIcon style={{backgroundColor:"#c98128"}}/>
</div>

<div className="userProfile">


<div onClick={signOut} className="home">
<Link to ="/login">
<h3 style={{color:"white"}}>Hlo {user ? user.email.substring(0,6) : 'guest' }</h3>
<span style={{color:"white"}}>{user ? 'SignOut' : 'Sign In'}</span>
</Link>
</div>

<div className="orders">
<h3>Features&</h3>
<span>orders</span>
</div>

<div className="prime">
<h3>Your</h3>
<span>Prime</span>
</div>

<div className="cart">
<Link to ="/checkout">
<ShoppingCartIcon />
</Link>
<h3>{cart?.length}</h3>
</div>

</div>



</div>


)
};

export default Header;