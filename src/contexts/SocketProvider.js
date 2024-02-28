import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const SocketContext=createContext()

export default function SocketProvider({children}) {
    const [socket,setsocket]=useState()
    const [socketOnMessage,setsocketOnMessage]=useState()
    let username=useSelector(store=>store?.authStore?.user?.username)
    let uid=useSelector(store=>store?.authStore?.user?.uid)
    useEffect(()=>{
        if(username && uid){
            let newSocket = new WebSocket(
                `wss://api.chatengine.io/person/?publicKey=${process.env.REACT_APP_PROJECT_ID}&username=${username}&secret=${uid}`
                );
            if(newSocket){
                setsocket(newSocket)
                newSocket.onmessage = (event) => setsocketOnMessage(JSON.parse(event?.data));
            }
            return ()=>{
                newSocket.onclose=(event)=>console.log(event)
            }
        }
      },[username,uid])
  return (
    <SocketContext.Provider value={{socket,socketOnMessage}}>
        {children}
    </SocketContext.Provider>
  )
}
