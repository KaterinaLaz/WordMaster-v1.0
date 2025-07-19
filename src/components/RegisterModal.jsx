import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const RegisterModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (pass !== confirm) {
      setMsg("❌ Passwords do not match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      setMsg("✅ Registration successful!");
    } catch (err) {
      setMsg("❌ " + err.message);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "8px" }}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          <button type="submit">Sign Up</button>
          {msg && <p>{msg}</p>}
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterModal;
