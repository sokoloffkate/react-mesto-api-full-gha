import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";

function Login({ isLoggedIn, onLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChangeData = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      });
    },
    [data]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onLogin(data.email, data.password);
    },
    [onLogin, data]
  );

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        action="submit"
        className="auth__form"
        name="login_form"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={data.email}
          onChange={handleChangeData}
          className="auth__field"
          placeholder="Email"
          name="email"
          id="auth-email"
          required
        />

        <input
          type="password"
          value={data.password}
          onChange={handleChangeData}
          className="auth__field"
          placeholder="Пароль"
          name="password"
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
