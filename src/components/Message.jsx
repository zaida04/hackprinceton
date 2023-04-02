import React from "react";
import { auth } from "../service/firebase";
import { useAuth } from "../AuthUserContext";

const Message = ({ message }) => {
  const {authUser} = useAuth();
//   console.log(message);
  return (
    <div
      className={`chat-bubble ${authUser && message.user == authUser.email ? "right" : ""}`}>
      {/* <img
        className="chat-bubble__left"
        // src={message.avatar}
        // alt="user avatar"
      /> */}
      <div className="chat-bubble__right">
        <p className="user-name">{message.user}</p>
        <p className="user-message">{message.message}</p>
      </div>
    </div>
  );
};

export default Message;