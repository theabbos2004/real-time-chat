import {  createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import {userReducer} from "../Reducer/authReducer"
import { setChatId, setSendMessage } from '../Reducer/ChatReducer'
import { createUser, getUsers, updateUserPassword } from './Api/ChatApi'
export default function useAuth() {
    const [isLoading,setIsloading]=useState(false)
    const [error,setError]=useState()

    const dispatch=useDispatch()

    const signUp=async ({email,password,username,firstname,lastname})=>{
        setIsloading(true)
        const authUsername=await getUsers()
            .then(users=> users?.map(user=>user?.username===username ? false : true))
            .catch(err=>setError(err.message))
        if(!authUsername.includes(false)){
            return await createUserWithEmailAndPassword(auth,email,password).then(res=>{
                createUser({username,firstname,lastname,usersecret:res?.user?.uid,email}).then((engineUser)=>{
                    setError()
                    setIsloading(false)
                    dispatch(userReducer({username,uid:res?.user?.uid}))
                    localStorage.setItem("chat_engine",JSON.stringify({id:engineUser?.id,uid:res?.user?.uid,username}))
                }).catch(err=>{
                    setError(err.message)
                })
                return {auth:true}
            }).catch(error=>{
                setIsloading(false)
                setError(error.message)
                return {auth:false}
            })
        }
        else{
            setIsloading(false)
            setError("such a username exists")
        }
    }
    
    const signIn = async ({email,password,username})=>{
        let id=null
        setIsloading(true)
        let authUsername = await getUsers().then(users=>{
            return users?.map(user=>{
                if(user?.username===username){
                    id=user?.id
                    return true
                }
                else{
                    return false
                }
            })
        })
        .catch(err=>setError(err.message))
        if(authUsername.includes(true)){
            return await signInWithEmailAndPassword(auth,email,password).then( async res=>{
                return await updateUserPassword({id,usersecret:res?.uidres?.user?.uid}).then(()=>{
                    setError()
                    setIsloading(false)
                    dispatch(userReducer({username,uid:res?.user?.uid}))
                    localStorage.setItem("chat_engine",JSON.stringify({id,uid:res?.user?.uid,username}))
                    return {auth:true}
                })
            }).catch(error=>{
                setIsloading(false)
                setError(error.message)
                return {auth:false}
            })
        }
        else{
            setError("username error")
            setIsloading(false)
        }
    }
    const logOut=()=>{
        signOut(auth).then(()=>{
            localStorage.removeItem("chat_engine")
            dispatch(userReducer())
            dispatch(setChatId(null))
            dispatch(setSendMessage({}))
        })
    }

    const updatePassword=async ({email})=>{
        sendPasswordResetEmail(auth, email)
    }
    const deleteUserfirebase=async ()=>{
        return await deleteUser(auth.currentUser).then(res=>{
            localStorage.removeItem("chat_engine")
            dispatch(userReducer())
            dispatch(setChatId(null))
            return {type:true,result:res}
        }).catch(err=>{
            return {type:false,result:err}
        })
    }

    return {signUp,signIn,logOut,updatePassword,isLoading,error,deleteUserfirebase}
}
