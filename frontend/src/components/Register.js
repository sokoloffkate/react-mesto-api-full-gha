import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";

function Register({ isLoggedIn, onRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  /*const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };*/

  /*const handleChangeData = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
    console.log(e.target)
    console.dir(data)
  };*/

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
      onRegister(data.email, data.password);
    },
    [onRegister, data]
  );

  if(isLoggedIn) {
    return <Redirect to="/"/>
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        action="submit"
        className="auth__form"
        name="login_form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
