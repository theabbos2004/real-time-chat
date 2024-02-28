import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChatId } from '../../../Reducer/ChatReducer'
import { removeChat } from '../../../Hook/Api/ChatApi'

export default function DeleteChatModal({deleteChatModal=()=>{}}) {
    const username=useSelector(store=>store?.authStore?.user?.username)
    const uid=useSelector(store=>store?.authStore?.user?.uid)
    const chatId=useSelector(store=>store?.chatStore?.chatId)

    const dispatch=useDispatch()

    const DeleteChat=()=>{
      if(username && uid && chatId){
        removeChat({username,usersecret:uid,chatId}).then(()=>{
          dispatch(setChatId(null))
          deleteChatModal(false)
        }).catch(()=>deleteChatModal(false)) 
      }
    }
  return (
    <div 
      className={`modal d-flex justify-content-center align-items-center `} 
      style={{backgroundColor:"rgba(0,0,0,0.8)"}}
    >
      <div className="modal-dialog" style={{minWidth:"25%"}}>
        <div className="modal-content" style={{backgroundColor:"rgb(32,33,35)"}}>
          <div className="modal-header">
            <h5 className="modal-title text-light">Chat Delete</h5>
            <button type="button" className="btn-close" onClick={()=>deleteChatModal(false)}></button>
          </div>
          <div className="modal-body">
            are you sure
          </div>
          <div className="modal-footer d-flex justify-content-between align-items-center">
            <button type="button" className="btn text-light" style={{backgroundColor:"var(--chat-bg-color)",border:"none"}} onClick={()=>deleteChatModal(false)}>Close</button>
            <button onClick={DeleteChat} type="submit" className="btn text-light bg-danger">Delete chat</button>
          </div>
        </div>
      </div>
    </div>
  )
}
