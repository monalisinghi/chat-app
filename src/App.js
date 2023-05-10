import React, { useState } from "react";
import { ChatRoom } from "./components/ChatRoom";
import { Auth } from "./components/Auth.js";
import AppWrapper from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";
import Lobby from "./components/Lobby";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(cookies.get("in-chat"));
  const [roomName, setRoomName] = useState(cookies.get("room"));

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        isInChat={isInChat}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper
      isAuth={isAuth}
      isInChat={isInChat}
      setIsAuth={setIsAuth}
      setIsInChat={setIsInChat}
    >
      {isInChat === false || isInChat === undefined ? (
        <Lobby setRoom={setRoomName} setIsInChat={setIsInChat} />
      ) : (
        <ChatRoom />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
