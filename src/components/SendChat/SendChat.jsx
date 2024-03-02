import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendChatApi, getMessage, updateMessage } from "../../Hook/Api/ChatApi";
import { messageIdReducer } from "../../Reducer/ChatReducer";
function SendChat() {
  const username = useSelector((store) => store?.authStore?.user?.username);
  const uid = useSelector((store) => store?.authStore?.user?.uid);
  const chatId = useSelector((store) => store?.chatStore?.chatId);
  const messageId = useSelector((store) => store?.chatStore?.messageId);
  const [message, SetMessage] = useState();
  const dispatch = useDispatch();

  const getMessageCallback = useCallback(() => {
    if (chatId && username && uid && messageId) {
      getMessage({ chatId, username, usersecret: uid, messageId })
        .then((res) => SetMessage(res?.text))
        .catch((err) => console.log(err));
    }
  }, [chatId, username, uid, messageId]);

  useEffect(() => getMessageCallback(), [getMessageCallback]);

  useEffect(() => {
    dispatch(messageIdReducer(null));
    SetMessage();
  }, [dispatch]);

  const updateMessageFunc = () => {
    updateMessage({
      chatId,
      username,
      usersecret: uid,
      messageId,
      message,
    }).then(() => {
      dispatch(messageIdReducer(null));
      SetMessage();
    });
  };
  return (
    <div
      className={`px-0 container d-flex justify-content-center align-items-center`}
      style={{ height: "8%" ,background:"var(--show-chat-color)"}}
    >
      <form
        className="rounded p-2 d-flex align-items-center"
        style={{
          width: "90%",
          height: "2.4rem",
          backgroundColor: "var(--chat-btn-color)",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.target[0].value;
          if (message && chatId && username) {
            if (messageId) {
              updateMessageFunc();
            } else {
              SendChatApi({ username, usersecret: uid, chatId, message }).then(
                () => SetMessage("")
              );
            }
          }
        }}
      >
        <input
          type="text"
          id="message_id"
          name="message"
          className="bg-transparent border-0"
          style={{
            outline: "none",
            width: "95%",
            color: "var(--secondary-color)",
          }}
          placeholder="Write a message..."
          value={message ? message : ""}
          onChange={(e) => SetMessage(e.target.value)}
        />
        <button
          className="d-flex justify-content-center align-content-center bg-transparent"
          type="submit"
          style={{ width: "5%", outline: "none", border: "none" }}
        >
          <i
            className="bi bi-send-fill fs-5"
            style={{ color: "var(--secondary-color)" }}
          ></i>
        </button>
      </form>
    </div>
  );
}
export default memo(SendChat)
