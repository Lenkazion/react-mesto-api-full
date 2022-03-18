import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="logo header__logo" src={logo} alt="Логотип"/>
      <Switch>
        <Route exact path="/">
          <div className="header__info">
            <span className="header__email">{props.email}</span>
            <Link to="/sign-in" className="header__link" onClick={props.handleLogout}>Выйти</Link>
          </div>
          <button
            className={props.isMenuOpen ? 'header__menu header__menu_opened' : 'header__menu header__menu_closed'}
            onClick={props.toggleMenu}>
            <span />
          </button>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
          Войти
          </Link>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
          Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;