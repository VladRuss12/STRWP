
import { createTheme } from '@mui/material/styles';

// Дневная тема
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
  },
});

// Ночная тема
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6600', 
    },
    secondary: {
      main: '#ffcc00',
    },
    background: {
      default: '#1a1a1a', 
      paper: '#222222', 
    },
    text: {
      primary: '#ffffff', 
      secondary: '#bbbbbb', 
    },
  },
});
