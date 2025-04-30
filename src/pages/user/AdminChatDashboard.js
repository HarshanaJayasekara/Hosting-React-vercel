// AdminChatDashboard.js
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import Chat from "./chat";

const AdminChatDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        {users.map((user) =>
          user.role === "user" ? (
            <button key={user.email} onClick={() => setSelectedUser(user.email)}>
              Chat with {user.email}
            </button>
          ) : null
        )}
      </div>
      {selectedUser && <Chat chatRoom={selectedUser} />}
    </div>
  );
};

export default AdminChatDashboard;