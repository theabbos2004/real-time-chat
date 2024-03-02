import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyChat } from "../../Hook/Api/ChatApi";
import { isChatList, isChatsettings } from "../../Reducer/ChatReducer";
import { SocketContext } from "../../contexts/SocketProvider";
import ThemeSwitch from "../shared/ThemeSwitch/ThemeSwitch";

function Header() {
  const socket = useContext(SocketContext);
  const username = useSelector((store) => store?.authStore?.user?.username);
  const uid = useSelector((store) => store?.authStore?.user?.uid);
  const chatId = useSelector((store) => store?.chatStore?.chatId);
  const [chatDetails, SetChatDetails] = useState();
  const dispatch = useDispatch();

  const getMyChatDetailsCallbalck = useCallback(() => {
    if (username && chatId) {
      getMyChat({ username, usersecret: uid, chatId })
        .then((result) => {
          SetChatDetails(result);
        })
        .catch(() => {
          SetChatDetails();
        });
    } else {
      SetChatDetails();
    }
  }, [username, uid, chatId]);
  useEffect(() => {
    getMyChatDetailsCallbalck();
  }, [socket?.socketOnMessage, getMyChatDetailsCallbalck]);
  return (
    <header
      className="py-1 d-flex justify-content-between align-items-center container"
      style={{
        height: "8%",
        borderBottom: "0.2rem solid var(--border-color)",
      }}
    >
      <div className="d-flex flex-column text-light">
        <div className="fw-bold text-capitalize m-0">
          {chatDetails ? chatDetails?.title : "chat is not selected"}
        </div>
        <div
          className="m-0"
          style={{ fontSize: "0.7rem", color: "var(--secondary-color)" }}
        >
          {chatDetails ? chatDetails?.people?.length : 0} members
        </div>
      </div>
      <div className="d-flex gap-3">
        <ThemeSwitch/>
        <div
          className="d-sm-none cursor-pointer"
          onClick={() => {
            dispatch(isChatList(true));
          }}
        >
          <i className="bi bi-chat-left text-light fs-5"></i>
        </div>
        <div
          className="d-lg-none cursor-pointer"
          onClick={() => {
            dispatch(isChatsettings(true));
          }}
        >
          <i className="bi bi-gear text-light fs-5"></i>
        </div>
      </div>
    </header>
  );
}
export default memo(Header)