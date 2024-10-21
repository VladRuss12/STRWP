import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom"; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#141414",
  color: "#fff",
  fontSize: 16,
  padding: "12px 16px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f0f0f0', 
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#d0d0d0', 
  },
}));

const MovieTable = ({ movies, delMovie, toggleTheme }) => {
  return (
    <>
      <Box mb={2}>
        {/* Кнопка для перехода на страницу с карточками */}
        <Button
          component={Link}
          to="/movie-cards"
          variant="contained"
          sx={{ backgroundColor: "#ff9900", "&:hover": { backgroundColor: "#ff7a00" } }}
        >
          Перейти на карточки
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#1b1b1b" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="h6" sx={{ color: "#ff9900" }}>
                  Title
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h6" sx={{ color: "#ff9900" }}>
                  Genre
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h6" sx={{ color: "#ff9900" }}>
                  Remove
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <StyledTableRow key={movie.id}>
                <StyledTableCell>{movie.title}</StyledTableCell>
                <StyledTableCell>{movie.genre}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => delMovie(movie.id)}
                    sx={{
                      backgroundColor: "#ff4c4c",
                      "&:hover": {
                        backgroundColor: "#ff3333",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MovieTable;
