import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],

    },
    reducers:{
        addToCart:(state,action)=>{
            const product=action.payload
            const existing=state.items.find(item => item._id=== product._id)

            if(!existing){
                state.items.push({...product,quantity:1})
            }else{
                existing.quantity+=1
            }
        },
        removeFromCart:(state,action)=>{
            state.items=state.items.filter(item=>item._id !== action.payload)
        },
        clearCart:(state)=>{
            state.items=[]
        }
    }
})

export const {addToCart, removeFromCart,clearCart }=cartSlice.actions

export default cartSlice.reducer