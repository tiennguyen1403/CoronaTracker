import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, notification } from "antd";
import { RiSunFill, RiMoonFill } from "react-icons/ri";

import "./header.scss";
import Login from "../Login";
import Register from "../Register";
import LanguageSelector from "../LanguageSelector";
import { GlobalActions } from "../../redux/rootAction";

function Header() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const darkMode = useSelector((state) => state.GlobalReducer.darkMode);

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible);
  };
  const toggleRegister = () => {
    setIsRegisterVisible(!isRegisterVisible);
  };
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    openLogoutNotification();
  };
  const openLogoutNotification = () => {
    notification["success"]({
      message: "You are logged out!",
    });
  };

  return (
    <div className={darkMode ? "dark-header-container" : "header-container"}>
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
            <li>
              <Link to="/news">{t("Header.News")}</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <span className="logout-btn" onClick={handleLogout}>
                  {t("Header.Logout")}
                </span>
              </li>
            ) : (
              <>
                <li>
                  <span className="login-btn" onClick={toggleLogin}>
                    {t("Header.Login")}
                  </span>
                </li>
                <li>
                  <span className="register-btn" onClick={toggleRegister}>
                    {t("Header.Register")}
                  </span>
                </li>
              </>
            )}
            <li>
              <LanguageSelector />
            </li>
            <li>
              <Switch
                checkedChildren={
                  <RiMoonFill
                    style={{ transform: "translateY(10%)", color: "#f0c420" }}
                  />
                }
                unCheckedChildren={
                  <RiSunFill style={{ transform: "translateY(10%)" }} />
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
