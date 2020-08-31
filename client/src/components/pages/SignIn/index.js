import React from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

import userActions from "store/user/actions";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl"

import "./style.css";

const SignIn = () => {
  const user = useSelector((state) => _.get(state.user, 'signIn'));
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

    dispatch(userActions.signIn(user));
  };
  return (
    <div className="signin-form-wrapper">
      <Card variant="outlined" className="signin-form-card">
        <CardContent className="signin-form-card-content">
          <Typography align="center" variant="h6">
            Вход
          </Typography>
          <div className="signin-form">
            <FormControl fullWidth margin="dense">
              <TextField
                required
                id="standard-required-email"
                label="Почта"
                value={_.get(user, 'email')}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                id="standard-password-input"
                label="Пароль"
                type="password"
                autoComplete="current-password"
                required
                value={_.get(user, 'password')}
              />
            </FormControl>
          </div>
          <CardActions className="signin-form-submit">
            <Button 
              fullWidth
              color="primary"
              variant="contained"
            >
              Войти
            </Button>
          </CardActions>
          <div className="signin-form-signup">
            Ещё не с нами? &nbsp;
            <Link to="/sign-up">Зарегистрируйтесь</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
