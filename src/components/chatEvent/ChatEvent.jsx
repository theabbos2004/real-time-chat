import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteChatModal } from "../shared/index";
import { getMyChat } from "../../Hook/Api/ChatApi";

function ChatEvent() {
  const username = useSelector((store) => store?.authStore?.user?.username);
  const uid = useSelector((store) => store?.authStore?.user?.uid);
  const chatId = useSelector((store) => store?.chatStore?.chatId);

  const [admin, setAdmin] = useState();
  const [isDeleteChatModal, SetIsDeleteChatModal] = useState();

  const [chatEvent, SetChatEvent] = useState([]);
  
  useEffect(() => {
    SetChatEvent((state) => {
      state?.push({
        id: 1,
        for: "admin",
        title: "delete chat",
        icon: "bi-trash-fill",
        event: () => SetIsDeleteChatModal(true),
      });
      return state;
    });
    if (username && chatId) {
      getMyChat({ username, usersecret: uid, chatId }).then((result) => {
        setAdmin(result?.admin);
      });
    }
    return () => {
      SetChatEvent([]);
    };
  }, [uid, username, chatId]);
  return (
    <ul className="h-100 py-2 col container text-light overflow-y-scroll">
      {!chatId ? (
        <li
          className="row m-0 px-1 my-2 text-center d-flex justify-content-center align-content-center"
          style={{ height: "2.8rem" }}
        >
          group not selected
        </li>
      ) : (
        chatEvent?.map((item, index) =>
          item?.for === "users" ? (
            <li
              key={index}
              className={`row m-0 my-2 py-3 rounded-3`}
              style={{ backgroundColor: "var(--chat-btn-color)" }}
            >
              <div className="col-10 d-flex justify-content-between align-items-center">
                <div className="text-danger text-capitalize">{item?.title}</div>
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
                ) : (
                  <i
                    className={`row bi fs-5 text-danger cursor-pointer ${item?.icon}`}
                    onClick={() => {
                      SetChatEvent((state) => {
                        return state.map((stateItem, index) => {
                          if (stateItem?.id === item?.id) {
                            return { ...item, request: true };
                          } else {
                            return stateItem;
                          }
                        });
                      });
                      item?.event(item?.id);
                    }}
                  ></i>
                )}
              </div>
            </li>
          ) : item?.for === "admin" && username === admin?.username ? (
            <li
              key={index}
              className={`row m-0 my-2 py-3 rounded-3}`}
              style={{ backgroundColor: "var(--chat-btn-color)" }}
            >
              <div className="col-10 d-flex justify-content-between align-items-center">
                <div className="text-danger text-capitalize">{item?.title}</div>
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
                ) : (
                  <i
                    className={`row bi fs-5 text-danger cursor-pointer ${item?.icon}`}
                    onClick={() => {
                      SetChatEvent((state) => {
                        return state.map((stateItem, index) => {
                          if (stateItem?.id === item?.id) {
                            return { ...item, request: true };
                          } else {
                            return stateItem;
                          }
                        });
                      });
                      item?.event(item?.id);
                    }}
                  ></i>
                )}
              </div>
            </li>
          ) : (
            ""
          )
        )
      )}
      {isDeleteChatModal && (
        <DeleteChatModal deleteChatModal={SetIsDeleteChatModal} />
      )}
    </ul>
  );
}
export default memo(ChatEvent)