import React from "react";
import "./login.css";
import {Link,useHistory} from "react-router-dom";
import {auth} from "./firebase";
import {useState} from "react";

function Login(){
const [email,setEmail] = useState("");
const [pass,setPass] = useState("");
const history = useHistory();

function register(e){
e.preventDefault();
auth.createUserWithEmailAndPassword(email,pass).then((auth)=>{
if(auth){
history.push("/")
alert("Registration Successful");
}}).catch((error)=>{
console.log(error.message);
});

}

const signIn = (e) => e.preventDefault();
auth.signInWithEmailAndPassword(email,pass).then((auth)=>{
if(auth){
history.push("/");
alert("Successfully Signed in");
}
}).catch((error)=>console.log(error.message));

return(
<div className='login'>
<Link to ="/">
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
                </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={pass} onChange={(e=>setPass(e.target.value))}/>

                    <button  type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button type="submit" onClick={register} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
};

export default Login;