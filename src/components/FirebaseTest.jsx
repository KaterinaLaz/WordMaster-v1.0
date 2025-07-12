import React, { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { doc, setDoc, getDoc } from "firebase/firestore";

const FirebaseTest = () => {
  const [message, setMessage] = useState("Loading...");
  const [data, setData] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const testRef = doc(db, "testCollection", "testDoc");

        // Write a test document
        await setDoc(testRef, {
          status: "connected!",
          timestamp: new Date().toISOString(),
        });

        // Read it back
        const snapshot = await getDoc(testRef);
        if (snapshot.exists()) {
          setData(snapshot.data());
          setMessage("✅ Firebase connected successfully!");
        } else {
          setMessage("❌ No document found.");
        }
      } catch (err) {
        console.error("Firebase error:", err);
        setMessage("❌ Firebase connection failed.");
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>Firebase Test</h2>
      <p>{message}</p>
      {data && (
        <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default FirebaseTest;
