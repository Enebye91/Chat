import { useEffect, useState } from "react";
import "./App.css";
// import { Socket } from "socket.io-client";
// import littleHeadline from "./LittleHeadline";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, SetSearch] = useState("");
  const [friends] = useState(["Trutter", "Matheo"]);
  const [activeFriend, setActiveFriend] = useState(null);
  // const [message, setMessage] = useState([]);
  // const [messageReceived, setMessageReceived] = useState([]);

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

  // const sendMessage = () => {
  //   if (message && activeFriend) {
  //     socket.emit("send_message", { message, to: activeFriend });
  //     setMessage("");
  //   }
  // };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageReceived((prevMessage) => [...prevMessages, data.message]);
  //   });

  //   return () => {
  //     socket.off("receive_message");
  //   };
  // })[socket];

  return (
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
          <ul>
            {filteredFriends.map((friend, index) => (
              <li key={index} onClick={() => handleFriendClick(friend)}>
                {friend}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeFriend && (
        <section>
          <div>
            <p>Chat with {activeFriend}</p>
            <button onClick={closeChatWindow}>Close</button>
          </div>
          <div>
            {messageReceived.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
            {/* <p>start chatting with {activeFriend}</p> */}
          </div>
          <input
            placeholder="Your message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </section>
      )}
    </section>
  );
}
