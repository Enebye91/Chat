import { useEffect, useState } from "react";

export default function UserList(onFriend) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5174/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("cant fetch users", error));
  }, []);

  return (
    <div>
      <p>User List</p>

      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={() => onFriend(user.name)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
