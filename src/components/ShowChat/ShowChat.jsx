import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessage,
  getChatDetails,
  getMyChats,
} from "../../Hook/Api/ChatApi";
import {
  AddChatModal,
  messageIdReducer,
  setChatId,
} from "../../Reducer/ChatReducer";
import { timeAgo } from "../../Hook/timeAgo";
import { SocketContext } from "../../contexts/SocketProvider";
import style from "./index.module.scss";

export default function ShowChat() {
  const socket = useContext(SocketContext);
  const username = useSelector((store) => store?.authStore?.user?.username);
  const uid = useSelector((store) => store?.authStore?.user?.uid);
  const chatId = useSelector((store) => store?.chatStore?.chatId);
  const [chatList, SetChatList] = useState();
  const [chatDetails, SetChatDetails] = useState();
  const [isChatDetails, SetIsChatDetails] = useState(true);

  const dispatch = useDispatch();
  const showChatRef = useRef();

  const getMessagesCallback = useCallback(() => {
    SetIsChatDetails(true);
    if (username && uid && chatId) {
      getChatDetails({ username, usersecret: uid, chatId }).then((res) => {
        SetIsChatDetails(false);
        if (!res.detail) {
          SetChatDetails(res);
        } else {
          dispatch(setChatId());
        }
      });
    } else if (username && uid) {
      getMyChats({ username, usersecret: uid }).then((res) => {
        SetIsChatDetails(false);
        SetChatList(res);
      });
    }
  }, [username, uid, chatId, dispatch]);

  useEffect(() => {
    getMessagesCallback();
  }, [socket?.socketOnMessage, getMessagesCallback]);

  useEffect(() => {
    showChatRef.current.scrollTo(0, showChatRef.current.scrollHeight);
  }, [isChatDetails]);

  const messageEvent = ({ id, event }) => {
    SetChatDetails((state) => {
      return state?.map((message) => {
        if (id === message?.id) {
          return { ...message, event };
        } else {
          return { ...message, event: false };
        }
      });
    });
  };
  return (
    <div
      className="py-1 px-0 text-light w-100 position-relative"
      style={{ height: "84%" ,background:"var(--show-chat-color)"}}
    >
      <ul
        className="p-0 m-1 m-0 h-100"
        style={{ width: "calc(100% - 0.2rem)", overflowY: "scroll" }}
        ref={showChatRef}
      >
        {chatList?.length < 1 ? (
          <li className="w-100 h-100 d-flex align-items-center justify-content-center">
            <button
              className="card  shadow text-light py-4 text-uppercase rounded-3 d-flex align-items-center justify-content-center"
              style={{ width: "50%", backgroundColor: "var(--chat-bg-color)" }}
              onClick={() => dispatch(AddChatModal(true))}
            >
              <p className="m-0">Create chat</p>
            </button>
          </li>
        ) : isChatDetails ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          chatDetails?.map((item, index) =>
            item?.sender?.username === username ? (
              <li className="my-3 row m-0" key={index}>
                <div className="col-3 col-lg-5 d-flex justify-content-end">
                  {item?.event ? (
                    <div
                      className={`${style.message__event} card col-3 d-flex justify-content-center align-items-center text-light`}
                      style={{ backgroundColor: "var(--chat-bg-color-1)" }}
                    >
                      <button
                        className="my-1"
                        onClick={() => {
                          messageEvent({ id: item?.id, event: false });
                          dispatch(messageIdReducer(item?.id));
                        }}
                      >
                        <i className="bi bi-pen fs-6"></i>
                      </button>
                      <button
                        className="my-1"
                        onClick={() => {
                          messageEvent({ id: item?.id, event: false });
                          deleteMessage({
                            chatId,
                            username,
                            usersecret: uid,
                            messageId: item?.id,
                          })
                        }}
                      >
                        <i className="bi bi-trash3 fs-6"></i>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-9 col-lg-7 row cursor-pointer p-0">
                  <div
                    className="card border-0 rounded-3  col-9 col-md-10 px-3 py-2"
                    style={{ backgroundColor: "var(--chat-bg-color)" }}
                    onClick={() => messageEvent({ id: item?.id, event: true })}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="fw-semibold text-capitalize"
                        style={{ color: "var(--blue-color)" }}
                      >
                        {item?.sender?.username}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--secondary-color)",
                        }}
                      >
                        {timeAgo(item?.created)}
                      </div>
                    </div>
                    <div className="text-white">{item?.text}</div>
                  </div>
                  <div className="col-3 col-md-2 m-0 d-flex justify-content-center align-items-end p-0">
                    <div
                      className="rounded-5 overflow-hidden position-relative"
                      style={{ width: "3rem",height:"3rem",border:"0.2rem solid var(--border-color)"}}
                    >
                      <img
                        src={
                          item?.sender?.avatar
                            ? item?.sender?.avatar
                            : require("../../assets/img/profile-anonim.png")
                        }
                        alt="profile"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li className="my-3 row m-0" key={index}>
                <div className="col-9 col-lg-7 row">
                  <div className="col-3 col-md-2 m-0 px-1 d-flex justify-content-center align-items-end">
                    <div
                      className="rounded-5 overflow-hidden position-relative"
                      style={{ width: "3rem",height:"3rem",border:"0.2rem solid var(--border-color)"}}
                    >
                      <img
                        src={
                          item?.sender?.avatar
                            ? item?.sender?.avatar
                            : require("../../assets/img/profile-anonim.png")
                        }
                        alt="profile"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>
                  <div
                    className="card border-0 rounded-3 col-9 col-md-10 py-2"
                    style={{ backgroundColor: "var(--chat-bg-color-1)" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div
                        className="fw-semibold text-capitalize"
                        style={{ color: "var(--blue-color)" }}
                      >
                        {item?.sender
                          ? item?.sender?.username
                          : "deleted account"}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--secondary-color)",
                        }}
                      >
                        {timeAgo(item?.created)}
                      </div>
                    </div>
                    <div className="text-white">{item?.text}</div>
                  </div>
                </div>
                <div className="col-3 col-lg-5"></div>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}
