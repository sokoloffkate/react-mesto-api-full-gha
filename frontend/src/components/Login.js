import React from "react";
import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form action="submit" className="auth__form" name="login_form">
        <input
          type="email"
          onChange={handleSetEmail}
          className="auth__field"
          placeholder="Email"
          name="email-name"
          id="auth-email"
          required
        />

        <input
          type="password"
          onChange={handleSetPassword}
          className="auth__field"
          placeholder="Пароль"
          name="password-name"
          id="auth-password"
          required
        />

        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
