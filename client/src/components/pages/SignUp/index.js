import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import userActions from "store/user/actions";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import "./style.css";

const SignUp = () => {
  const user = useSelector((state) => _.get(state.user, 'signUp'));
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

    dispatch(userActions.signUp(user));
  };

  const handleChange = (e) => {
    const value = _.get(e.target, 'value')
    const key = _.get(e.target, 'name')
    console.log(value, key)
    
    dispatch(userActions.changeField('signUp', key, value))
  }

  return (
    <div className="signup-form-wrapper">
      <Card variant="outlined" className="signup-form-card">
        <CardContent>
          <Typography align="center" variant="h6">
            Регистрация
          </Typography>
          <div className="signup-form">
            <FormControl fullWidth margin="dense">
              <TextField
                required
                id="standard-required-input"
                label="Имя"
                name="userName"
                value={_.get(user, 'userName')}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                required
                id="standard-required-input"
                label="Почта"
                name="email"
                type="email"
                value={_.get(user, 'email')}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                required
                id="standard-password-input"
                label="Пароль"
                type="password"
                autoComplete="current-password"
                name="password"
                value={_.get(user, 'password')}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </div>
          <CardActions className="signup-form-submit">
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => handleSignUp()}
            >
              Зарегистрироваться
            </Button>
          </CardActions>
          <div className="signup-form-signin">
            Уже зарегистрированы? &nbsp;
            <Link to="/sign-in">Войдите</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
