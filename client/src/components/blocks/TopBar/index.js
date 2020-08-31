import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import { ReactComponent as MenuIcon } from "assets/icons/logo.svg";

import "./style.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <AppBar className="topbar-wrapper">
        <Toolbar className="topbar-toolbar">
          <Link to="/dashboard" className="topbar-menu-left">
            <IconButton
              edge="start"
              className="topbar-menu-button"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="topbar-title">
              PASTA LA VISTA
            </Typography>
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
