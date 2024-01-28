import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './routes';
import { createTheme, ThemeProvider } from "@mui/material";

export const queryClient = new QueryClient();

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#327358',
    },
    secondary: {
      main: '#F0B142',
    },
    common: {
      black: '#181818',
      white: '#FFFFFF',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          textTransform: "none",
          height: "48px",
          fontSize: '1.1rem',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      }
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
