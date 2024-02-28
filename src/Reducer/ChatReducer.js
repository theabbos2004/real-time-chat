import { createSlice } from "@reduxjs/toolkit"

const initialState={
    socket:null,
    chatId:null,
    sendMessage:{},
    refresh:false,
    isChatList:false,
    isChatsettings:false,
    isAddChatModal:false,
    messageId:null,
}
const chatSlice=createSlice({
    initialState,
    name:"authStore",
    reducers:{
        socketReducer:(state,action)=>{
            state.socket=!action.payload
        },
        setChatId:(state,action)=>{
            state.chatId=action?.payload
        },
        setSendMessage:(state,action)=>{
            state.sendMessage=action?.payload
        },
        changeRefresh:(state,action)=>{
            state.refresh=action?.payload
        },
        isChatList:(state,action)=>{
            state.isChatList=action?.payload
        },
        isChatsettings:(state,action)=>{
            state.isChatsettings=action?.payload
        },
        AddChatModal:(state,action)=>{
            state.isAddChatModal=action?.payload
        },
        messageIdReducer:(state,action)=>{
            state.messageId=action?.payload
        },
    }
})
export const {socketReducer,setChatId,setSendMessage,isChatList,isChatsettings,AddChatModal,messageIdReducer}=chatSlice.actions
export default chatSlice.reducer