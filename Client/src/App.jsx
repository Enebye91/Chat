// import { useState } from 'react'

import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";

// variabel til backend server
// Man kan bruge den til at listen to an event
const socket = io.connect("http://localhost:5174");

function App() {
  // Der er ikke noget som hedder emit i react, og det er her socket.io kommer ind
  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" }); // Her kan vi sende noget data, hvad at sætte et object til eventet.
  };

  // Her kan man listen til eventet fra backenden ved et useEffect Hook, hver gang at der bliver smidt et event over til os
  // Så hver gang at et event er emittet, køre denne function med socket variablen
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <>
      <input placeholder="Message..." />
      <button onClick={sendMessage}> Send </button>
    </>
  );
}

export default App;
