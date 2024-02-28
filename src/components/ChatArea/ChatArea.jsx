import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatList, ChatSetting, Message } from "../index"
import { setChatId } from '../../Reducer/ChatReducer'
import { getMyChats } from '../../Hook/Api/ChatApi'
import { SocketContext } from '../../contexts/SocketProvider'
export default function ChatArea() {
  const socket =useContext(SocketContext)
  const username=useSelector(store=>store?.authStore?.user?.username)
  const uid=useSelector(store=>store?.authStore?.user?.uid)
  const chatId=useSelector(store=>store?.chatStore?.chatId)
  const isChatsettings=useSelector(store=>store?.chatStore?.isChatsettings)
  const isChatList=useSelector(store=>store?.chatStore?.isChatList)
  

  const dispatch=useDispatch()

  useEffect(()=>{
    if(username){
      getMyChats({username,usersecret:uid}).then(Mychats=>{
        if(Mychats){
          if(Mychats[0] && !chatId){
            let firstMyChatId=Mychats[0].id
              dispatch(setChatId(firstMyChatId))
            }
        }
      })}
  },[socket,dispatch,uid,username,chatId])

  return (
    <div className='vh-100 row m-0 overflow-hidden'>
        <ChatList className={`${isChatList?"col-12":"d-none"} ${isChatsettings?"d-sm-none":"col-sm-4"} d-sm-block col-sm-5 col-lg-3`}/>
        <Message className={`${isChatList?"d-none":"col-12"} ${isChatsettings?"d-none col-md-7 d-md-block":"col-12"} col-sm-7 col-lg-6`}/>
        <ChatSetting className={`${isChatsettings?"col-12 col-sm-12 d-sm-block col-md-5":"d-none"} col-lg-3 d-lg-block `}/>
    </div>
  )
}