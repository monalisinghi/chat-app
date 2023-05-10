import Cookies from "universal-cookie";

const cookies = new Cookies();

const Lobby = ({ setRoom, setIsInChat }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    cookies.set("in-chat", true);
    cookies.set("room", event.target.room.value);
    setRoom(event.target.room.value);
    setIsInChat(true);
  };
  return (
    <main className="join-main">
      <form method="post" onSubmit={(e) => onSubmit(e)}>
        <div className="form-control">
          <label htmlFor="room">Enter room name:</label>
          <input
            type="text"
            name="room"
            id="room"
            placeholder="Room code"
            required
          />
        </div>
        <button className="btn">Create room</button>
      </form>
    </main>
  );
};

export default Lobby;
