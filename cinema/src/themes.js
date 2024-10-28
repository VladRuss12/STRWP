import { createTheme } from '@mui/material/styles';

const sharedComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: '#ff7a00',
        },
      },
      contained: {
        backgroundColor: '#ff9900',
        color: '#fff',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiInputBase-input': {
          color: '#000',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#1976d2',
          },
          '&:hover fieldset': {
            borderColor: '#ff9900',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ff7a00',
          },
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: '#fff',
        color: '#000',
      },
    },
  },
};

const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h5: {
    fontWeight: 500,
    color: '#1976d2',
  },
  body2: {
    color: 'text.secondary',
  },
};

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
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    error: {
      main: '#ff4c4c',
    },
  },
  typography,
  components: {
    ...sharedComponents,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '8px',
        },
      },
    },
  },
});

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
      default: '#121212',
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
    error: {
      main: '#ff4c4c',
    },
  },
  typography,
  components: {
    ...sharedComponents,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f1f1f',
          borderRadius: '8px',
        },
      },
    },
  },
});
