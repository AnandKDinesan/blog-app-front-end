import { create } from "@mui/material/styles/createTransitions";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:false},
    reducers:{
        login(state) {
            state.isLoggedIn=true
        },logout(state){
            localStorage.removeItem("email")
            state.isLoggedIn=false
        },
    },
});

export const store=configureStore(
   { reducer:authSlice.reducer
}
)

export const authActions= authSlice.actions