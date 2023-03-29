import { Typography } from '@mui/material';

const ErrorBlock = () => {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        color="error"
        gutterBottom
        sx={{ marginTop: '20px' }}
      >
        Произошла ошибка.
      </Typography>
      <Typography sx={{ marginTop: '20px' }}>
        Пожалуйста, попробуйте зайти на страницу позже.
      </Typography>
    </>
  );
};

export default ErrorBlock;
