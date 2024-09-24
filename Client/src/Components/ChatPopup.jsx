import PropTypes from "prop-types";
import UserList from "./GetUsers";

export default function ChatPopup({ 
  isOpen, 
  search, 
  handleSearchChange, 
  // filteredFriends, 
  handleFriendClick }) 
{
  return (
    isOpen && (
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
          <UserList search={search} onFriend={handleFriendClick}/>
          {/* <ul>
            {filteredFriends.map((friend, index) => (
              <li key={index} onClick={() => handleFriendClick(friend)}>
                {friend}
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    )
  );
}
 
ChatPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  // filteredFriends: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFriendClick: PropTypes.func.isRequired,
};

