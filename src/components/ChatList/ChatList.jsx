import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddChatModal, isChatList, setChatId } from "../../Reducer/ChatReducer";
import { getMyChats, getUsers } from "../../Hook/Api/ChatApi";
import { timeAgo } from "../../Hook/timeAgo";
import { Link } from "react-router-dom";
import { CreateChatModal } from "../shared/index";
import { SocketContext } from "../../contexts/SocketProvider";
import style from "./index.module.scss"

export default function ChatList({ className }) {
  const socket = useContext(SocketContext);

  const username = useSelector((store) => store?.authStore?.user?.username);
  const uid = useSelector((store) => store?.authStore?.user?.uid);
  const chatId = useSelector((store) => store?.chatStore?.chatId);
  const isAddChatModal = useSelector(
    (store) => store?.chatStore?.isAddChatModal
  );

  const [ChatList, SetChatList] = useState();
  const [user, setUser] = useState();
  const [chatSearch, setChatSearch] = useState();

  const dispatch = useDispatch();

  const getMyChatListCallback = useCallback(() => {
    if (username && uid) {
      getMyChats({ username, usersecret: uid })
        .then((res) => {
          if(chatId){
            let resultChats=res?.map(chat=>{
              if(chatId===chat?.id){
                return {...chat,active:true}
              }
              else{
                return {...chat,active:false}
              }
            })
            SetChatList(resultChats)
          }
          else{
            SetChatList(res)
          }
        })
        .catch((err) => console.log(err));
      getUsers()
        .then((users) => users.map((user) =>username === user?.username ? setUser(user) : ""))
        .catch((err) => console.log(err));
    }
  }, [uid, username , chatId]);

  useEffect(() => {
    getMyChatListCallback();
  }, [socket, getMyChatListCallback]);

  const chatActive=({id})=>{
    SetChatList(chats=>{
      return chats?.map(chatState=>{
        if(id===chatState?.id){
          return {...chatState,active:true}
        }
        else{
          return {...chatState,active:false}
        }
      })
    })
  }
  return (
    <section
      className={`h-100 container ${className} z-3`}
      style={{ borderRight: "0.2rem solid var(--border-color)" }}
    >
      {/* profile */}
      <div
        className="py-1 d-flex align-items-center justify-content-between"
        style={{ height: "8%" }}
      >
        <Link
          to="/profile"
          className="col-10 col-sm-12 d-flex rounded-3 cursor-pointer py-4  text-decoration-none"
          style={{
            height: "90%",
          }}
        >
          <div className="col-3 col-md-2 col-lg-3 m-0 d-flex align-items-center">
            <div
              className="bg-secondary rounded-5 position-relative"
              style={{ width: "2.5rem",height:"2.5rem",border:"0.2rem solid var(--border-color)"}}
            >
              <img
                src={
                  user?.avatar
                    ? user?.avatar
                    : require("../../assets/img/profile-anonim.png")
                }
                alt="profile"
                className="w-100 h-100 rounded-5 object-fit-cover"
              />
            </div>
          </div>
          <div className="col-6 col-lg-7 d-flex align-items-center">
            <div className="text-light fw-bolder">{user?.username}</div>
          </div>
        </Link>
        <div
          className="col-2 d-sm-none d-flex justify-content-center"
          onClick={() => dispatch(isChatList(false))}
        >
          <i
            className="bi bi-x fs-3 text-light"
            style={{ fontSize: "0.6rem" }}
          ></i>
        </div>
      </div>
      {/* search chat */}
      <div
        className="w-100 pt-2 d-flex justify-content-center align-items-center"
        style={{ height: "8%" }}
      >
        <input
          type="search"
          id="search_id"
          className={`w-100 rounded-3 p-2 border-0 ${style.search}`}
          placeholder="search chat"
          style={{ height: "100%",color: "var(--secondary-color)",backgroundColor: "var(--chat-btn-color)",outline:"none"}}
          onChange={(e) => setChatSearch(e.target.value)}
        />
      </div>
      {/* Chat list */}
      <div className="overflow-y-scroll overflow-x-hidden my-2 pe-1" style={{ height: "74%" }}>
        <ul className="h-100 list-group">
          <li className="my-2 text-secondary fw-semibold">Chats</li>
          {ChatList?.length > 0
            ? ChatList?.filter((chat) => {
                if (chatSearch) {
                  let req = null;
                  chat.title.includes(chatSearch) && (req = chat);
                  return req;
                } else {
                  return chat;
                }
              })?.map((chat, index) => (
                <li
                  className="my-2 d-flex justify-content-between cursor-pointer"
                  key={index}
                  onClick={() => {
                    chatActive({id:chat?.id})
                    dispatch(setChatId(chat?.id));
                    dispatch(isChatList(false));
                  }}
                  style={{ backgroundColor:"transparent",borderRight:chat?.active ? "0.3rem solid var(--chat-bg-color)" : ""}}
                >
                  <div className="col-3 col-md-2 col-lg-3 m-0 d-flex align-items-center">
                    <div
                      className="bg-secondary rounded-5 position-relative"
                      style={{ width: "3rem",height:"3rem",border:"0.2rem solid var(--border-color)"}}
                    >
                      <img
                        src={
                          chat?.admin?.avatar
                            ? chat?.admin.avatar
                            : require("../../assets/img/profile-anonim.png")
                        }
                        alt="profile"
                        className="w-100 h-100 rounded-5 object-fit-cover"
                      />
                      <div
                        className={`rounded-5 ${
                          chat?.admin?.is_online ? "d-block" : "d-none"
                        }`}
                        style={{
                          position: "absolute",
                          top: "0rem",
                          left: "0rem",
                          width: "0.8rem",
                          height: "0.8rem",
                          backgroundColor: "var(--online-green-color)",
                          border: "0.1rem solid var(--chat-bg-color-1)",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-6 d-flex flex-column p-1">
                    <div className="text-light fw-bolder text-uppercase">
                      {chat?.title}
                    </div>
                    <div
                      style={{ fontSize: "0.7rem", color: "rgb(160,160,160)" }}
                    >
                      {chat?.last_message?.text
                        ? chat?.last_message?.text?.length > 20
                          ? chat?.last_message?.text?.slice(0, 20) + "..."
                          : chat?.last_message?.text
                        : "message not available"}
                    </div>
                  </div>
                  <div className="col-2 d-flex flex-column justify-content-center p-0">
                    <div
                      className="mb-1 w-100 d-flex justify-content-center"
                      style={{ fontSize: "0.7rem", color: "rgb(160,160,160)" }}
                    >
                      {chat?.last_message?.created
                        ? timeAgo(chat?.last_message?.created)
                        : ""}
                    </div>
                  </div>
                </li>
              ))
            : ""}
        </ul>
      </div>
      {/* add chat btn */}
      <div
        className="d-flex justify-content-end"
        style={{ height: "8%" }}
      >
        <button
          className="btn d-flex justify-content-center align-items-center"
          style={{
            width: "2.4rem",
            height: "2.4rem",
            backgroundColor: "var(--chat-btn-color)",
          }}
          onClick={() => dispatch(AddChatModal(true))}
        >
          <i 
            className="bi bi-plus-circle fs-4 d-flex justify-content-center align-items-center"
            style={{color:"var(--secondary-color)"}}
          ></i>
        </button>
      </div>
      {/* Modal */}
      {isAddChatModal ? <CreateChatModal /> : ""}
    </section>
  );
}
