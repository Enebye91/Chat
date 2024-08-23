import "./App.css";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
// import Popup from "./PopUp.jsx";

const socket = io.connect("http://localhost:5174");

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, SetSearch] = useState("");
  const [friends] = useState(["Trutter", "Matheo"]);
  const [activeChats, setActiveChats] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState({}); // Beskeden man modtager fra den anden bruger.
  const chatContainerRef = useRef(null);

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
    if (!activeChats.includes(friend)) {
      setActiveChats((prevChats) => [...prevChats, friend]);
    }
    setIsOpen(false);
  };

  const closeChatWindow = (friend) => {
    setActiveChats((prevChats) => prevChats.filter((chat) => chat !== friend));
  };

  const sendMessage = () => {
    const friend = activeChats[0];
    socket.emit("send_message", { message, friend });
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (!isOpen && chatContainerRef.current) {
      chatContainerRef.current.style.right = "100px";
    } else if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.style.right = "400px";
    }
  }, [isOpen]);

  // Brug useEffect til at lytte til beskeder fra serveren
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prevMessages) => {
        const newMessages = { ...prevMessages };
        if (!newMessages[data.friend]) {
          newMessages[data.friend] = [];
        }
        newMessages[data.friend].push(data.message);

        return newMessages;
      });
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

        <div ref={chatContainerRef} className="chat_windows_container">
          {activeChats.map((friend, index) => (
            <section key={index} className="chat_app_wrapper">
              <div className="chat_app_container">
                <p>To: {friend}</p>
                <button
                  className="close_btn"
                  onClick={() => closeChatWindow(friend)}
                >
                  X
                </button>
              </div>
              <div className="msg_received_wrapper">
                {messageReceived[friend] &&
                  messageReceived[friend].map((msg, msgIndex) => (
                    <p key={msgIndex} className="msg_received">
                      {msg}
                    </p>
                  ))}
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
          ))}
        </div>
      </section>
    </>
  );
}
