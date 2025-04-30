
import '../user/adminUser.css'; 
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";

function UserChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(""); // State to handle the user's message

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await addDoc(collection(db, "messages"), {
          message,
          timestamp: serverTimestamp(),
          userId: auth.currentUser.uid,
          userRole: "user", // User's message
        });
        setMessage(""); // Clear message input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.userRole === "user" ? "user" : "admin"}`}
          >
            <strong>{msg.userRole}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default UserChat;
