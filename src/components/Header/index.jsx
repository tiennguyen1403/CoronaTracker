import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Switch } from "antd";
import { FiSun, FiMoon } from "react-icons/fi";

import "./header.scss";
import Login from "../Login";
import Register from "../Register";
import LanguageSelector from "../LanguageSelector";
import { GlobalActions } from "../../redux/rootAction";

function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible);
  };
  const toggleRegister = () => {
    setIsRegisterVisible(!isRegisterVisible);
  };
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
  };

  return (
    <div className="header-container">
      <Login isLoginVisible={isLoginVisible} toggleLogin={toggleLogin} />
      <Register
        isRegisterVisible={isRegisterVisible}
        toggleRegister={toggleRegister}
      />
      <header className="header">
        <div className="header__logo">
          <img src="./images/logo.png" alt="logo" />
          <Link to="/">
            Corona<span>Tracker</span>
          </Link>
        </div>

        <label htmlFor="menuBtn" className="menuBtn">
          <MenuOutlined />
        </label>
        <input type="checkbox" id="menuBtn" />

        <div className="menu">
          <ul>
            <li>
              <Link to="/">{t("Header.Home")}</Link>
            </li>
            <li>
              <Link to="/analytics">{t("Header.Analytics")}</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <a href="#a" onClick={handleLogout}>
                  {t("Header.Logout")}
                </a>
              </li>
            ) : (
              <>
                <li>
                  <a href="#a" onClick={toggleLogin}>
                    {t("Header.Login")}
                  </a>
                </li>
                <li>
                  <a href="#a" onClick={toggleRegister}>
                    {t("Header.Register")}
                  </a>
                </li>
              </>
            )}
            <li>
              <Link to="/news">{t("Header.News")}</Link>
            </li>
            <li>
              <a href="#a">{t("Header.About")}</a>
            </li>
            <li>
              <LanguageSelector />
            </li>
            <li>
              <Switch
                checkedChildren={
                  <FiMoon style={{ transform: "translateY(10%)" }} />
                }
                unCheckedChildren={
                  <FiSun style={{ transform: "translateY(10%)" }} />
                }
                onChange={() => dispatch(GlobalActions.toggleDarkMode())}
              />
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
