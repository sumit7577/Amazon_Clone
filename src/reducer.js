export const initialState = {
cart :[],
user: null,
}


// Selector
export const TotalPrice = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state,action) =>{
 switch(action.type){
 case "Add_Basket":
   return {
     ...state,
     cart : [...state.cart, action.item],
     };
 case "Remove_Cart":
   const index = state.cart.findIndex((basketItem)=>basketItem.id ===action.id);
    let newCart = [...state.cart];
    
    if(index>=0){
    
    newCart.splice(index,1);
    }
   else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        )
      }
    
    return {...state, cart: newCart }
    
   case "Sign_In":
    return{...state,
    user: action.user
    }
   
   case "Empty_Basket":
     return{...state,
      cart : [] }
    
    
   default:
     return state;
     
     
     
 }
 
 
 
 }
 

export default reducer;