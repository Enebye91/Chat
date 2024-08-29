import PropTypes from "prop-types";

export default function ChatWindow({
  friend,
  isMinimized,
  darkmode,
  toggleDarkmode,
  toggleMinimizedChat,
  closeChatWindow,
  messageReceived,
  message,
  handleMessageChange,
  handleKeyDown,
  sendMessage,
}) {
  return (
    <section
      className={`chat_app_wrapper ${darkmode ? "dark-mode" : "light-mode"} ${
        isMinimized ? "minimized" : ""
      }`}
    >
      {isMinimized ? (
        <div
          className="minimized_chat"
          onClick={() => toggleMinimizedChat(friend)}
        >
          <img src="path" alt={`${friend}'s chat`} />
        </div>
      ) : (
        <>
          <div className="chat_app_container">
            <p>{friend}</p>
            <div className="btn_container">
              <button
                onClick={toggleDarkmode}
                className={`color_btn ${darkmode ? "dark-mode" : "light-mode"}`}
              >
                {darkmode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                className={`minimize_btn ${
                  darkmode ? "dark-mode" : "light-mode"
                }`}
                onClick={() => toggleMinimizedChat(friend)}
              >
                -
              </button>
              <button
                className={`close_btn ${darkmode ? "dark-mode" : "light-mode"}`}
                onClick={() => closeChatWindow(friend)}
              >
                X
              </button>
            </div>
          </div>
          <div className="msg_received_wrapper">
            {messageReceived[friend] &&
              messageReceived[friend].map((msg, msgIndex) => (
                <p
                  key={msgIndex}
                  className={`msg_received ${
                    darkmode ? "dark-mode" : "light-mode"
                  }`}
                >
                  {msg}
                </p>
              ))}
          </div>
          <div className="chat_wrapper">
            <input
              placeholder="Aa"
              value={message[friend] || ""}
              onChange={(event) => handleMessageChange(event, friend)}
              onKeyDown={(event) => handleKeyDown(event, friend)}
            />
            <button
              className={`send_btn ${darkmode ? "dark-mode" : "light-mode"}`}
              onClick={() => sendMessage(friend)}
            >
              Send
            </button>
          </div>
        </>
      )}
    </section>
  );
}

ChatWindow.propTypes = {
  friend: PropTypes.string.isRequired,
  isMinimized: PropTypes.bool.isRequired,
  darkmode: PropTypes.bool.isRequired,
  toggleDarkmode: PropTypes.func.isRequired,
  toggleMinimizedChat: PropTypes.func.isRequired,
  closeChatWindow: PropTypes.func.isRequired,
  messageReceived: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};
