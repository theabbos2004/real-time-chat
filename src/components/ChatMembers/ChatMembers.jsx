import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "../shared/index";
import {
  getChatMembers,
  getMyChat,
  removeChatMember,
} from "../../Hook/Api/ChatApi";
import { SocketContext } from "../../contexts/SocketProvider";

export default function ChatMembers() {
  const socket = useContext(SocketContext);
  const username = useSelector((store) => store?.authStore?.user?.username);
  const uid = useSelector((store) => store?.authStore?.user?.uid);
  const chatId = useSelector((store) => store?.chatStore?.chatId);
  const [chatDetails, SetChatDetails] = useState();
  const [admin, setAdmin] = useState();

  const getChat = useCallback(() => {
    if (username && chatId && uid) {
      getMyChat({ username, usersecret: uid, chatId }).then((result) => {
        setAdmin(result);
      });
      getChatMembers({ username, usersecret: uid, chatId })
        .then((respon) => {
          let members = respon.filter(
            (user) => user?.person?.username !== username && user
          );
          SetChatDetails(members);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [username, chatId, uid]);

  useEffect(() => {
    getChat();
  }, [socket, getChat]);

  return (
    <ul className="h-100 py-2 container text-light overflow-y-scroll col">
      {!chatId ? (
        <li
          className="row m-0 px-1 my-2 text-center d-flex justify-content-center align-content-center"
          style={{ height: "2.8rem" }}
        >
          group not selected
        </li>
      ) : !chatDetails < 0 ? (
        <li className="row">
          <Skeleton count={4} height="2.8rem" classNameBox="m-0 my-2" />
        </li>
      ) : chatDetails?.length > 0 ? (
        chatDetails?.map((item, index) => (
          <li
            key={index}
            className="row m-0 my-2 py-3 rounded-3"
            style={{ backgroundColor: "var(--chat-btn-color)" }}
          >
            <div className="col-3 m-0 d-flex justify-content-center align-items-center">
              <div
                className="bg-secondary rounded-5 overflow-hidden position-relative"
                style={{ width: "2rem", height: "2rem" }}
              >
                <img
                  src={
                    item?.person?.avatar
                      ? item?.person?.avatar
                      : require("../../assets/img/profile-anonim.png")
                  }
                  alt="profile"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
            <div className="col-7 d-flex justify-content-between align-items-center">
              <div className="text-light text-capitalize">
                {item?.person?.username}
              </div>
            </div>
            <div className="col-2 d-flex justify-content-between align-items-center">
              {item?.request ? (
                <div
                  className="spinner-border row"
                  role="status"
                  style={{ width: "1.25rem", height: "1.25rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : admin?.admin?.username === username ? (
                <i
                  className="row bi bi-dash-circle-fill fs-5 text-danger cursor-pointer"
                  onClick={() => {
                    SetChatDetails((state) =>
                      state.map((user) => {
                        if (user?.person?.username === item?.person?.username) {
                          return { ...user, request: true };
                        } else {
                          return user;
                        }
                      })
                    );
                    removeChatMember({
                      removeUsername: item?.person?.username,
                      chatId,
                      username,
                      usersecret: uid,
                    })
                      .then(() => {
                        SetChatDetails((state) =>
                          state.map((user) => {
                            if (
                              user?.person?.username === item?.person?.username
                            ) {
                              return { ...user, request: false };
                            } else {
                              return user;
                            }
                          })
                        );
                      })
                      .catch();
                  }}
                ></i>
              ) : (
                ""
              )}
            </div>
          </li>
        ))
      ) : (
        <li
          className="row m-0 px-1 my-2 text-center d-flex justify-content-center align-content-center"
          style={{ height: "2.8rem" }}
        >
          group members are not available
        </li>
      )}
    </ul>
  );
}
