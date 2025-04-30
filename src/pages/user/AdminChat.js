import '../user/adminUser.css'; 
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";

function AdminChat() {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState(""); // State to handle the admin's reply

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  const sendReply = async () => {
    if (reply.trim()) {
      try {
        await addDoc(collection(db, "messages"), {
          message: reply,
          timestamp: serverTimestamp(),
          userId: auth.currentUser.uid,
          userRole: "admin", // Admin's reply
        });
        setReply(""); // Clear the reply input field
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.userRole === "admin" ? "admin" : "user"}`}
          >
            <strong>{msg.userRole}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply"
        />
        <button onClick={sendReply}>Send Reply</button>
      </div>
    </div>
  );
}

export default AdminChat;
