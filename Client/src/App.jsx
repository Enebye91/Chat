import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Popup from "./PopUp.jsx";

const socket = io.connect("http://localhost:5174");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState(""); // Beskeden man modtager fra den anden bruger.

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessage("");
  };

  // Brug useEffect til at lytte til beskeder fra serveren
  useEffect(() => {
    // const handleReceiveMessage = (data) => {
    //   setMessageReceived(data.message);
    // };

    socket.on("receive_message", (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, data.message]);
    }); // ,handleReceiveMessage

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      socket.off("receive_message"); //, handleReceiveMessage
    };
  }, []); // Tom afhængighedsliste betyder, at denne effekt kun kører én gang ved montering

  return (
    <>
      <Popup />
      <section className="chat_app_wrapper">
        <div className="chat_app_container">
          
        </div>
        <input
          placeholder="Message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}> Send </button>
        <h1>Message: </h1>
        {messageReceived}
      </section>
    </>
  );
}

export default App;
