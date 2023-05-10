import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AppWrapper = ({ children, setIsAuth, isInChat, setIsInChat }) => {
  const leaveRoom = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    cookies.remove("in-chat");
    cookies.remove("room");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className={isInChat ? "chat-container" : "join-container"}>
      <header className={isInChat ? "chat-header" : "join-header"}>
        {!isInChat && <h1>Chat App</h1>}
        {isInChat && (
          <>
            <h2>Room: {cookies.get("room")}</h2>
            <button className="btn" onClick={leaveRoom}>
              Leave
            </button>
          </>
        )}
      </header>
      <>{children}</>
    </div>
  );
};

export default AppWrapper;
