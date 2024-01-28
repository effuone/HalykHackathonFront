import React, { useState } from 'react';
import {
  ToggleButtonGroup,
  ToggleButton,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import LoginForm from '@/components/LoginForm';
import RegistrationForm from '@/components/RegistrationForm';

const AuthPage = () => {
  const [authType, setAuthType] = useState<string>('login');

  const handleChooseAuthType = (
    event: React.MouseEvent<HTMLElement>,
    newAuthType: string
  ) => {
    event.preventDefault();
    setAuthType(newAuthType);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={15}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          width: '450px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '10px',
          padding: 2,
      }}>
        <ToggleButtonGroup
          color="primary"
          value={authType}
          exclusive
          onChange={handleChooseAuthType}
          aria-label="auth type"
          size='small'
        >
          <ToggleButton value="login">Логин</ToggleButton>
          <ToggleButton value="registration">Регистрация</ToggleButton>
        </ToggleButtonGroup>
        {authType === 'login' ? <LoginForm /> : <RegistrationForm />}
      </Box>
    </Box>
  );
};

export default AuthPage;
