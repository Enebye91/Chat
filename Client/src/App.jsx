import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
// import Popup from "./PopUp.jsx";

const socket = io.connect("http://localhost:5174");

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, SetSearch] = useState("");
  const [friends] = useState(["Trutter", "Matheo"]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]); // Beskeden man modtager fra den anden bruger.
  // const [chatHistory, setChatHistory] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    SetSearch(e.target.value);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.toLowerCase().includes(search.toLowerCase())
  );

  const handleFriendClick = (friend) => {
    setActiveFriend(friend);
  };

  const closeChatWindow = () => {
    setActiveFriend(null);
  };

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  // Brug useEffect til at lytte til beskeder fra serveren
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, data.message]);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []); // Tom afhængighedsliste betyder, at denne effekt kun kører én gang ved montering

  return (
    <>
      <section className="app_container">
        <div
          className={`chat_circle ${isOpen ? "open" : ""}`}
          onClick={toggleChat}
        >
          <span>💬</span>
        </div>

        {isOpen && (
          <div className="chat_popup">
            <div className="headline_container">
              <p>New message</p>
              {/* <littleHeadline text="New message" /> */}
            </div>

            <input
              type="text"
              placeholder="Search for a friend"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="searchlist_wrapper">
              <ul>
                {filteredFriends.map((friend, index) => (
                  <li key={index} onClick={() => handleFriendClick(friend)}>
                    {friend}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeFriend && (
          <section className="chat_app_wrapper">
            <div className="chat_app_container">
              <p>To: {activeFriend}</p>
              <button className="close_btn" onClick={closeChatWindow}>
                X
              </button>
            </div>
            <div className="msg_received_wrapper">
              {messageReceived.map((msg, index) => (
                <p key={index} className="msg_received">{msg}</p>
              ))}
              {/* <p>start chatting with {activeFriend}</p> */}
            </div>
            <div className="chat_wrapper">
              <input
                placeholder="Aa"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="send_btn" onClick={sendMessage}>
                Send
              </button>
            </div>
          </section>
        )}
      </section>
      {/* <section className="chat_app_wrapper">
        <div className="chat_app_container"></div>
        <input
          placeholder="Message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}> Send </button>
        <h1>Message: </h1>
        {messageReceived}
      </section> */}
    </>
  );
}
