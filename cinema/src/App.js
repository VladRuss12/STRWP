import React, { useState } from "react";
import { Provider } from "react-redux";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { lightTheme, darkTheme } from "./themes";
import store from "./redux/store"; // Import the Redux store
import NavBar from "./pages/components/NavBar";
import AppRouter from "./AppRouter";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Provider store={store}> {/* Wrap the app with the Redux provider */}
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Container maxWidth="md">
            <AppRouter />
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
