import React from "react";
import logoPath from "images/logo.svg";
import { Route, Link, Switch } from "react-router-dom";

function Header({email,  onLogOut }) {
  
  return (
    <header className="header">
      <img src={logoPath} className="header__logo" alt="Лого" />
      <Switch>
      <Route exact path="/">
        <div className="header__auth-main">
          <p className="header__auth-email">{email}</p>
          <button onClick={onLogOut} className="header__auth-button">Выйти</button>
        </div>
      </Route>
      <Route path="/sigh-in">
        <Link to="/sigh-up" className="header__auth-link">
          Регистрация
        </Link>
      </Route>
      <Route path="/sigh-up">
        <Link to="/sigh-in" className="header__auth-link">
          Войти
        </Link>
      </Route>
      </Switch>
    </header>
  );
}

export default Header;
