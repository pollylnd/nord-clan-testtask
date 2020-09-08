import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import authActions from "store/auth/actions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LogoIcon from "assets/logo.png";

import "./style.css";

const TopBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="topbar">
      <AppBar className="topbar-wrapper">
        <Toolbar className="topbar-toolbar">
          <Link to="/dashboard" className="topbar-menu-left">
            <img src={LogoIcon} alt="pasta la vista" />
          </Link>
          {_.isEmpty(currentUser) ? (
            <Link to="/sign-in" className="topbar-menu-right">
              <Button>Вход</Button>
            </Link>
          ) : (
            <>
              <div className="topbar-menu-right">
              <Link to={`/recipe/create`} className="recipe-create-button">
                Добавить рецепт
              </Link>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AccountCircleIcon
                  className="topbar-menu-right-account"
                />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  {currentUser.userName}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to={`/recipe/user`} className="topbar-menu-button">
                    Мои рецепты
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button className="topbar-menu-button" onClick={() => dispatch(authActions.signOut())}>
                    Выход
                  </Button>
                </MenuItem>
              </Menu>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
