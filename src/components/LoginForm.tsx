import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAlertMessage, { AlertMessageType } from '@/lib/hooks/useAlertMessage';
import { useAuth } from '@/lib/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AlertMessage from './AlertMessage';
import Copyright from './Copyright';

const LoginForm: React.FC = () => {
  const [userData, setUserData] = React.useState({
    password: '',
    iin: '',
  });
  const navigate = useNavigate();
  const { alertMessage, showAlertMessage, hideAlertMessage } =
    useAlertMessage();
  const [passwordError, setPasswordError] = React.useState(false);
  const { user, login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setPasswordError(userData.password === '');

    if (userData.iin && userData.password) {
      try {
        await login(userData);
      } catch (error) {
        const errorMessage =
          error.status === 404
            ? "This user doesn't exist or incorrect password provided"
            : error.message;
        showAlertMessage(
          `Login failed! ${errorMessage}`,
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
          Логин
        </Typography>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          noValidate
          sx={{ mt: 1, width: 350, }}
        >
          <Box>
            <Typography margin="normal"  component="p">
              ИИН
            </Typography>
            <TextField
              required
              fullWidth
              id="iin"
              name="iin"
              autoComplete="iin"
              size='small'
              autoFocus
              value={userData.iin}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ mt: 2,}}>
          <Typography margin="normal"  component="p">
            Пароль
          </Typography>
          <TextField
            required
            fullWidth
            size='small'
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userData.password}
            error={passwordError}
            onChange={handleInputChange}
          />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти в аккаунт
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
      <Copyright sx={{ mt: 5, mb: 4 }} />
    </Container>
  );
};

export default LoginForm;
