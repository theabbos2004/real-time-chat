import { createSlice } from "@reduxjs/toolkit"

const initialState={
    user:{},
}
const authSlice=createSlice({
    initialState,
    name:"authStore",
    reducers:{
        userReducer:(state,action)=>{
            state.user=action?.payload
        },
        setIsLoading:(state,action)=>{
            state.isLoading=action?.payload
        }
    }
})
export const {userReducer,setIsLoading}=authSlice.actions
export default authSlice.reducer