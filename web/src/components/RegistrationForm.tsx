import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AlertMessage from './AlertMessage';
import { useAuth } from '@/lib/hooks/useAuth';
import useAlertMessage, { AlertMessageType } from '@/lib/hooks/useAlertMessage';
import Copyright from './Copyright';

const RegistrationForm: React.FC = () => {
  const [userData, setUserData] = React.useState({
    iin: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const { register } = useAuth();
  const [passwordError, setPasswordError] = React.useState(false);
  const { alertMessage, showAlertMessage, hideAlertMessage } =
    useAlertMessage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setPasswordError(userData.password === '');

    if (userData.iin && userData.password && userData.firstName && userData.lastName) {
      try {
        await register(userData);
      } catch (error) {
        showAlertMessage(
          `Registration failed! ${error.message}`,
          AlertMessageType.ERROR
        );
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <Typography margin="normal"  component="p">
                  Имя
                </Typography>
              </Box>
              <TextField
                size='small'
                required
                fullWidth
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography margin="normal"  component="p">
                  Фамилия
                </Typography>
                <TextField
                  size='small'
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  autoComplete="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography margin="normal"  component="p">
                  ИИН
                </Typography>
                <TextField
                  size='small'
                  required
                  fullWidth
                  id="iin"
                  label="ИИН"
                  name="iin"
                  autoComplete="iin"
                  value={userData.iin}
                  onChange={handleInputChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography margin="normal"  component="p">
                  Пароль
                </Typography>
                <TextField
                  size='small'
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userData.password}
                  error={passwordError}
                  onChange={handleInputChange}
                />
              </Box>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
        </Box>
        {alertMessage && (
          <AlertMessage
            message={alertMessage.message}
            type={alertMessage.type}
            onClose={hideAlertMessage}
          />
        )}
      </Box>
      <Copyright sx={{ mt: 3, }} />
    </Container>
  );
};

export default RegistrationForm;
