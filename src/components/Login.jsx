import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterModal from "./RegisterModal";

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      <LoginForm onShowRegister={() => setShowRegister(true)} />
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default LoginPage;
