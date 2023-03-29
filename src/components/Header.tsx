import React, { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import { Button, Divider } from '@mui/material';

const Header = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  React.useEffect(() => {
    if (window.localStorage.getItem('pryaniki-token')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [path]);

  const handleClickLogout = () => {
    if (isAuth && window.confirm('Вы хотите выйти из аккаунта?')) {
      window.localStorage.removeItem('pryaniki-token');
      navigate('/');
      setIsAuth(false);
    } else {
      navigate('/signin');
    }
  };

  let { pathname } = useLocation();
  return (
    <Box sx={{ flexGrow: 1, color: '#ffffff' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: '#ffffff', marginRight: '20px' }}
          >
            STATS APP
          </Typography>

          {isAuth && (
            <Typography
              variant="h6"
              to="/table"
              component={Link}
              sx={{ flexGrow: 1, color: '#ffffff' }}
            >
              Статистика
            </Typography>
          )}

          <Button color="inherit" onClick={handleClickLogout}>
            {isAuth ? 'Выйти' : 'Войти'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
