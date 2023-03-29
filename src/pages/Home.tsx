import { LockOutlined } from '@mui/icons-material';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import MainBack from '../assets/images/main-bg.jpg';
import Header from '../components/Header';

type Props = {};

const Home = (props: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <>
      <Header />
      <main>
        <Paper
          sx={{
            position: 'relative',
            minHeight: '100vh',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${MainBack})`,
          }}
        >
          {/* Increase the priority of the hero background image */}
          {/* {
            <img
              style={{ display: 'none' }}
              src={MainBack}
              alt="Фоновая картинка"
            />
          } */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.4)',
            }}
          />
          <Grid
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 10 },
                  pr: { md: 10 },
                  textAlign: 'center',
                }}
              >
                <Typography component="h1" variant="h3" color="inherit">
                  Таблицы данных
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </>
  );
};

export default Home;
