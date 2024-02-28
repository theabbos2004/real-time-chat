import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "../shared/index";
import {
  addToMyChatMember,
  getChatMembers,
  getMembers,
  getMyChat,
  removeChatMember,
} from "../../Hook/Api/ChatApi";
import { SocketContext } from "../../contexts/SocketProvider";
export default function Members() {
  const socket = useContext(SocketContext);
  const username = useSelector((store) => store?.authStore?.user?.username);
  const uid = useSelector((store) => store?.authStore?.user?.uid);
  const chatId = useSelector((store) => store?.chatStore?.chatId);
  const [chatDetails, SetChatDetails] = useState();
  const [admin, setAdmin] = useState();

  const getChat = useCallback(() => {
    if (username && chatId) {
      getMyChat({ username, usersecret: uid, chatId }).then((result) => {
        setAdmin(result);
      });
      getMembers()
        .then((members) => {
          getChatMembers({ username, usersecret: uid, chatId })
            .then((chatMembers) => {
              let resultMember = [];
              for (let i = 0; i < members.length; i++) {
                if (members[i].username === username) {
                  continue;
                }
                let member = false;
                for (let a = 0; a < chatMembers.length; a++) {
                  if (
                    members[i].username === chatMembers[a].person.username &&
                    chatMembers[a].person.username
                  ) {
                    member = true;
                  }
                }
                resultMember.push({ ...members[i], member });
              }
              SetChatDetails(resultMember);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [chatId, uid, username]);

  useEffect(() => {
    getChat();
  }, [socket, getChat]);
  return (
    <ul className="h-100 py-2 col container text-light overflow-y-scroll">
      {!chatId ? (
        <li
          className="row m-0 px-1 my-2 text-center d-flex justify-content-center align-content-center"
          style={{ height: "2.8rem" }}
        >
          group not selected
        </li>
      ) : !chatDetails?.length > 0 ? (
        <li className="row">
          <Skeleton count={4} height="2.8rem" classNameBox="m-0 my-2" />
        </li>
      ) : (
        chatDetails?.map((item, index) => (
          <li
            key={index}
            className="row m-0 my-2 py-3 rounded-3"
            style={{ backgroundColor: "var(--chat-btn-color)" }}
          >
            <div className="col-3 m-0 d-flex justify-content-center align-items-center">
              <div
                className="bg-secondary rounded-5 position-relative"
                style={{ width: "2rem", height: "2rem" }}
              >
                <img
                  src={
                    item?.avatar
                      ? item?.avatar
                      : require("../../assets/img/profile-anonim.png")
                  }
                  alt="profile"
                  className="w-100 h-100 rounded-5 object-fit-cover"
                />
                <div
                  className={`rounded-5 ${
                    item?.is_online ? "d-block" : "d-none"
                  }`}
                  style={{
                    position: "absolute",
                    top: "0rem",
                    left: "0rem",
                    width: "0.6rem",
                    height: "0.6rem",
                    backgroundColor: "var(--online-green-color)",
                    border: "0.1rem solid var(--chat-btn-color)",
                  }}
                ></div>
              </div>
            </div>
            <div className="col-7 d-flex justify-content-between align-items-center">
              <div className="text-light text-capitalize">{item?.username}</div>
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
              ) : item?.member && admin?.admin?.username === username ? (
                <i
                  className="row bi bi-dash-circle-fill fs-5 text-danger cursor-pointer"
                  onClick={() => {
                    SetChatDetails((state) =>
                      state.map((user) => {
                        if (user?.id === item?.id) {
                          return { ...user, request: true };
                        } else {
                          return user;
                        }
                      })
                    );
                    removeChatMember({
                      removeUsername: item?.username,
                      chatId,
                      username,
                      usersecret: uid,
                    })
                      .then(() => {
                        SetChatDetails((state) =>
                          state.map((user) => {
                            if (user?.id === item?.id) {
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
              ) : item?.member ? (
                <i className="bi bi-check-circle-fill row fs-5 text-success"></i>
              ) : (
                <i
                  className="row bi bi-plus-circle-fill fs-5 text-success cursor-pointer"
                  onClick={() => {
                    SetChatDetails((state) =>
                      state.map((user) => {
                        if (user?.id === item?.id) {
                          return { ...user, request: true };
                        } else {
                          return user;
                        }
                      })
                    );
                    addToMyChatMember({
                      addUsername: item?.username,
                      chatId,
                      username,
                      usersecret: uid,
                    })
                      .then(() => {
                        SetChatDetails((state) =>
                          state.map((user) => {
                            if (user?.id === item?.id) {
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
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
