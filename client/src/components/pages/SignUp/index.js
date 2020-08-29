import React from 'react'
import { Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// import './style.css'

export default function SignUp() {

  return (
    <div>
      <Card variant="outlined">
      <CardContent>
        <Typography >
          Регистрация
        </Typography>
        <div className='login-form'>
          <TextField required id="standard-required-name" label="Имя" />
          <TextField required id="standard-required-email" label="Почта" />
          <TextField required id="standard-required-login" label="Логин" />
          <TextField
            id="standard-password-input"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <CardActions>
          <Button>Зарегистрироваться</Button>
        </CardActions>
        <div>
          Уже зарегистрированы? 
          &nbsp;
          <Link to="/sign-in">
            Войдите
          </Link>
          
        </div>
      </CardContent>
    </Card>
    </div>
  )
}