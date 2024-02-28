import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../Reducer/authReducer";

const AuthProvider =({children})=>{
    const user=useSelector(store=>store?.authStore?.user)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const setNavigate=useCallback((pathUrl)=>{
        navigate(pathUrl)
    },[])

    useEffect(()=>{
        let username=JSON.parse(localStorage.getItem("chat_engine"))?.username
        let uid=JSON.parse(localStorage.getItem("chat_engine"))?.uid
        let id=JSON.parse(localStorage.getItem("chat_engine"))?.id
        auth.onAuthStateChanged((user)=>{
            if(user && username && uid){
                dispatch(userReducer({id,username,uid:user?.uid}))
                setNavigate("/")
            }
            else{
                setNavigate("/auth")
            }
        })
    }, [dispatch, user?.username ,setNavigate]);

    return children
}
export default AuthProvider