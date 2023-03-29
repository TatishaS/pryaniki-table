import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SigninForm } from '../types';
import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import SignInBack from '../assets/images/signup-bg.jpg';

const HOST_URL = 'https://test.v5.pryaniky.com';

const SignIn = () => {
  const [fields, setFields] = React.useState<SigninForm>({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fields.username || !fields.password) {
      alert('Необходимо ввести username и пароль!');
      return;
    }

    try {
      const resp = await fetch(
        `${HOST_URL}/ru/data/v3/testmethods/docs/login
      `,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: fields.username,
            password: fields.password,
          }),
        }
      )
        .then(response => response.json())
        .then(({ data }) => {
          const token = data.token;
          window.localStorage.setItem('pryaniki-token', token);

          navigate('/table');
        });

      setFields({
        username: '',
        password: '',
      });
    } catch (error) {
      alert('Ошибка! Неверный username или пароль');
    }
  };
  return (
    <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${SignInBack})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Вход в аккаунт
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={fields.username}
                    onChange={handleChangeField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={fields.password}
                    onChange={handleChangeField}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Войти
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
