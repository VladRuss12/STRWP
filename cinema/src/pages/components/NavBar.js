import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Brightness7 from '@mui/icons-material/Brightness7'; 
import Brightness4 from '@mui/icons-material/Brightness4'; 

const NavBar = ({ toggleTheme, isDarkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MovieApp
        </Typography>
        <Button color="inherit" component={Link} to="/movies">
          Movies
        </Button>
        <Button color="inherit" component={Link} to="/movie-cards">
          Movie Cards
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 2 }}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
