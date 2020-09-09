import React from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

import authActions from "store/auth/actions";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import "./style.css";

const SignIn = () => {
  const user = useSelector((state) => _.get(state.auth, "signIn"));
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

  const handleChange = (e) => {
    const value = _.get(e.target, "value");
    const key = _.get(e.target, "name");

    dispatch(authActions.changeField("signIn", key, value));
  };

  const handleSignIn = () => {
    if (!isEmptyFields(user)) {
      return false;
    }

    dispatch(authActions.signIn(user));
  };
  return (
    <form className="signin-form-wrapper">
      <Card variant="outlined" className="signin-form-card">
        <CardContent className="signin-form-card-content">
          <Typography align="center" variant="h6">
            Вход
          </Typography>
          <div className="signin-form">
            <FormControl fullWidth margin="dense">
              <TextField
                autoComplete=""
                required
                id="standard-required-email"
                variant="outlined"
                label="Почта"
                name="email"
                defaultValue={_.get(user, "email")}
                value={_.get(user, "email")}
                className="signin-form-label"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                required
                id="standard-password-input"
                label="Пароль"
                name="password"
                type="password"
                autoComplete=""
                variant="outlined"
                value={_.get(user, "password")}
                className="signin-form-label"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </div>
          <CardActions className="signin-form-submit">
            <Button
              fullWidth
              className="signin-submit-button"
              variant="contained"
              onClick={() => handleSignIn()}
            >
              Войти
            </Button>
          </CardActions>
          <div className="signin-form-signup">
            Ещё не с нами? &nbsp;
            <Link className="signin-form-label" to="/sign-up">
              Зарегистрируйтесь
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default SignIn;
