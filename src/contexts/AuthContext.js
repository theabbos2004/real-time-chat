import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { userReducer } from "../Reducer/authReducer";

const AuthProvider =({children})=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const username=JSON.parse(localStorage.getItem("chat_engine"))?.username
    const uid=JSON.parse(localStorage.getItem("chat_engine"))?.uid
    const id=JSON.parse(localStorage.getItem("chat_engine"))?.id

    const authCallback=useCallback(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user && username && uid){
                dispatch(userReducer({id,username,uid:user?.uid}))
            }
            else{
                navigate("/auth")
            }
        })
    },[dispatch, username , uid , id ,navigate])

    useEffect(()=>{
        authCallback()
    }, [authCallback]);

    return children
}
export default AuthProvider