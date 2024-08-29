import "./App.css";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import ChatCircle from "./Components/ChatCircle";
import ChatPopup from "./Components/ChatPopup";
import ChatWindow from "./Components/ChatWindow";


const socket = io.connect("http://localhost:5174");

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, SetSearch] = useState("");
  const [friends] = useState(["Trutter", "Matheo"]);
  const [activeChats, setActiveChats] = useState([]);
  const [message, setMessage] = useState({});
  const [messageReceived, setMessageReceived] = useState({});
  const [darkmode, setDarkmode] = useState(false);
  const [minimizedChat, setMinimizedChat] = useState([]);
  const chatContainerRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSearchChange = (e) => SetSearch(e.target.value);

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
    setMinimizedChat((prev) => prev.filter((chat) => chat !== friend));
  };

  const handleMessageChange = (event, friend) => {
    const newMessage = event.target.value;
    setMessage((prevMessages) => ({
      ...prevMessages,
      [friend]: newMessage,
    }));
  };

  const sendMessage = (friend) => {
    if (message[friend]) {
      socket.emit("send_message", { message: message[friend], friend });

      setMessageReceived((prevMessages) => {
        const newMessages = { ...prevMessages };
        if (!newMessages[friend]) {
          newMessages[friend] = [];
        }
        newMessages[friend].push(message[friend]);

        return newMessages;
      });

      setMessage((prevMessages) => ({ ...prevMessages, [friend]: "" }));
    }
  };

  const handleKeyDown = (event, friend) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage(friend);
    }
  };

  const toggleDarkmode = () => setDarkmode((prevMode) => !prevMode);

  const toggleMinimizedChat = (friend) => {
    if (minimizedChat.includes(friend)) {
      setMinimizedChat((prev) => prev.filter((chat) => chat !== friend));
    } else {
      setMinimizedChat((prev) => [...prev, friend]);
    }
  };

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
  }, []);

  useEffect(() => {
    if (!isOpen && chatContainerRef.current) {
      chatContainerRef.current.style.right = "100px";
    } else if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.style.right = "400px";
    }
  }, [isOpen]);

  return (
    <section className="app_container">
      <ChatCircle isOpen={isOpen} toggleChat={toggleChat} />
      <ChatPopup
        isOpen={isOpen}
        search={search}
        handleSearchChange={handleSearchChange}
        filteredFriends={filteredFriends}
        handleFriendClick={handleFriendClick}
      />
      <div ref={chatContainerRef} className="chat_windows_container">
        {activeChats.map((friend, index) => (
          <ChatWindow
            key={index}
            friend={friend}
            isMinimized={minimizedChat.includes(friend)}
            darkmode={darkmode}
            toggleDarkmode={toggleDarkmode}
            toggleMinimizedChat={toggleMinimizedChat}
            closeChatWindow={closeChatWindow}
            messageReceived={messageReceived}
            message={message}
            handleMessageChange={handleMessageChange}
            handleKeyDown={handleKeyDown}
            sendMessage={sendMessage}
          />
        ))}
      </div>
    </section>
  );
}
