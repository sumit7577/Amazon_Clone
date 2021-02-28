import React from "react";
import {useReducer,createContext,useContext} from "react";

export const StateContext = createContext();

export const StateProvider = ({initialState,reducer,children}) =>(
<StateContext.Provider value={useReducer(reducer,initialState)} >
{children}
</StateContext.Provider>
);

export const UseContextValue = ()=> useContext(StateContext);