

export default function ChatCicle({ isOpen, toggleChat }) {
   return (
    <div className={`chat_circle ${isOpen ? "open" : ""}`} onClick={toggleChat}>
      <span>💬</span>
    </div>
   );
}