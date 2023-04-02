import React, { useEffect, useState, useRef } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../service/firebase";
import { useAuth } from "../AuthUserContext";

const Chat = (props) => {
  const { authUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") {
      return;
    }
    const messageObj = {
      message: inputMessage,
      user: "Anonymous" + (Math.random() + 1).toString(36).substring(7) + ":",
      timestamp: Date.now(),
    };
    if (authUser) {
      messageObj.user = authUser.email;
    }
    const infoRef = doc(firestore, "streams", props.data);
    const data1 = {
      chat: [...messages, messageObj],
    };
    await updateDoc(infoRef, data1);
    setInputMessage("");
  };

  useEffect(() => {
    const infoRef = doc(firestore, "streams", props.data);
    const unsubscribe = onSnapshot(infoRef, (QuerySnapshot) => {
      let messages = [];
      setMessages(QuerySnapshot.data().chat);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        sendMessage();
      }
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-semibold mb-4 pb-4 border-b-[1px] border-gray-400">
        Chat
      </h2>
      <div className="overflow-y-auto h-64 mb-4">
        <ul>
          {messages.map((message, index) => (
            <li key={index} className="mb-1">
              <span className="font-semibold text-indigo-600 mr-2 flex flex-row">
                {message.user}{" "}
                {props.allEduPurple.find((x) => x.email === message.user) && (
                  <p className="ml-2 py-1 px-3 rounded-xl text-xs bg-indigo-600 text-white">
                    ✓
                  </p>
                )}
              </span>
              {message.message}
            </li>
          ))}
        </ul>
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:border-indigo-300"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-r hover:bg-indigo-700 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
