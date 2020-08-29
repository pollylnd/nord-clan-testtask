import React from 'react'

import { Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import './style.css'

export default function Login() {

  return (
    <div>
      <Card variant="outlined">
      <CardContent>
        <Typography >
          Вход
        </Typography>
        <div className='login-form'>
          <TextField required id="standard-required-email" label="Логин или почта" />
          <TextField
            id="standard-password-input"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <CardActions>
          <Button>Войти</Button>
        </CardActions>
        <div>
          Ещё не с нами? 
          &nbsp;
          <Link to="/sign-up">
            Зарегистрируйтесь
          </Link>
          
        </div>
      </CardContent>
    </Card>
    </div>
  )
}