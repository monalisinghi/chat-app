import React, { useState, useEffect, useLayoutEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const ChatRoom = () => {
  const roomName = cookies.get("room");
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  const getInitials = (string) => {
    const names = string.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", roomName),
      orderBy("createdAt")
    );

    const scrollInView = () => {
      const messageList = document.querySelector(".chat-messages");
      messageList.scrollTop = messageList.scrollHeight;
    };

    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      scrollInView();
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: roomName,
    });
    setNewMessage("");
  };

  return (
    <>
      <div className="chat-messages">
        {messages.length > 0 && (
          <ul className="messages">
            {messages.map((message) => (
              <li
                key={message.id}
                className={`message ${
                  message.user === auth.currentUser.displayName
                    ? "msg-right"
                    : "msg-left"
                }`}
              >
                <span className="user">{getInitials(message.user)}</span>
                <span className="msg">{message.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="chat-form-container">
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            required
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit" className="send">
            <svg
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#1f32af"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};
