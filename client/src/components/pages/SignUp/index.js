import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import authActions from "store/auth/actions";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import "./style.css";

const SignUp = () => {
  const user = useSelector((state) => _.get(state.auth, "signUp"));
  const dispatch = useDispatch();

  const isEmptyFields = (fields) => {
    const emptyFields = [];

    for (const field in fields) {
      if (_.isNil(field)) {
        emptyFields.push(field);
      }
    }

    return _.isEmpty(emptyFields);
  };

  const handleSignUp = () => {
    if (!isEmptyFields(user)) {
      return false;
    }

    dispatch(authActions.signUp(user));
  };

  const handleChange = (e) => {
    const value = _.get(e.target, "value");
    const key = _.get(e.target, "name");

    dispatch(authActions.changeField("signUp", key, value));
  };

  return (
    <form className="signup-form-wrapper">
      <Card variant="outlined" className="signup-form-card">
        <CardContent className="signup-form-card-content">
          <Typography align="center" variant="h6">
            Регистрация
          </Typography>
          <div className="signup-form">
            <FormControl fullWidth margin="dense">
              <TextField
                required
                id="standard-required-input-name"
                label="Имя"
                name="userName"
                variant="outlined"
                value={_.get(user, "userName", "")}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                required
                id="standard-required-input-email"
                label="Почта"
                name="email"
                type="email"
                variant="outlined"
                value={_.get(user, "email", "")}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                required
                id="standard-password-input"
                label="Пароль"
                type="password"
                variant="outlined"
                name="password"
                value={_.get(user, "password", "")}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </div>
          <CardActions className="signup-form-submit">
            <Button
              fullWidth
              className="signup-submit-button"
              variant="contained"
              onClick={() => handleSignUp()}
            >
              Зарегистрироваться
            </Button>
          </CardActions>
          <div className="signup-form-signin">
            Уже зарегистрированы? &nbsp;
            <Link className="signup-form-label" to="/sign-in">
              Войдите
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default SignUp;
