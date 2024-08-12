// import { useState } from 'react'

import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

// variabel til backend server
// Man kan bruge den til at listen to an event
const socket = io.connect("http://localhost:5174");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState(""); // Beskeden man modtager fra den anden bruger.
  // Der er ikke noget som hedder emit i react, og det er her socket.io kommer ind
  const sendMessage = () => {
    socket.emit("send_message", { message }); // Her kan vi sende noget data, hvad at sætte et object til eventet.
  };

  // Her kan man listen til eventet fra backenden ved et useEffect Hook, hver gang at der bliver smidt et event over til os
  // Så hver gang at et event er emittet, køre denne function med socket variablen
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageReceived(data, message);
  //     // alert(data.message);
  //   });
  // }, [socket]);

  // Brug useEffect til at lytte til beskeder fra serveren
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageReceived(data.message);
    };

    socket.on("receive_message", handleReceiveMessage);

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Ryd op, når komponenten demonteres
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []); // Tom afhængighedsliste betyder, at denne effekt kun kører én gang ved montering

  return (
    <>
      <input
        placeholder="Message..."
        // onChange={(event) => {
        //   setMessage(event.target.value);
        // }}

        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage}> Send </button>
      <h1>Message: </h1>
      {messageReceived}
    </>
  );
}

export default App;
