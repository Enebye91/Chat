import { useEffect, useState } from "react";
import "./App.css";
// import { Socket } from "socket.io-client";
// import littleHeadline from "./LittleHeadline";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, SetSearch] = useState("");
  const [friends] = useState(["Trutter", "Matheo"]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    SetSearch(e.target.value);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.toLowerCase().includes(search.toLowerCase())
  );

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
              <li key={index}>{friend}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
