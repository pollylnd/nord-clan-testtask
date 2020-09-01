import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import LogoIcon  from "assets/logo.png";

import "./style.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <AppBar className="topbar-wrapper">
        <Toolbar className="topbar-toolbar">
          <Link to="/dashboard" className="topbar-menu-left">
            <img src={LogoIcon} />
          </Link>
          <Link to="/sign-in" className="topbar-menu-right">
            <Button>Вход</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
