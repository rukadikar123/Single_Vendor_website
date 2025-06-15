import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:true
    },
    reducers:{
            setUser:(state,action)=>{
                    state.user=action.payload
            },
            setLoading:(state,action)=>{
                state.loading=action.payload
            },
            logout:(state)=>{
                state.user=null
            }
    }
})

export const {setUser,logout,setLoading}=authSlice.actions

export default authSlice.reducer