import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

// Стилизация таблицы
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#141414", // Темный фон
  color: "#fff",              // Белый цвет текста
  fontSize: 16,               // Крупный шрифт
  padding: "12px 16px",       // Отступы для комфорта чтения
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#1f1f1f", // Темно-серый фон для нечетных строк
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#2c2c2c", // Чуть светлее фон для четных строк
  },
}));

const MovieTable = ({ movies, delMovie }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#1b1b1b" }}> {/* Общий фон */}
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell> {/* Заголовки таблицы */}
              <Typography variant="h6" sx={{ color: "#ff9900" }}> {/* Оранжевый цвет заголовков */}
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
  );
};

export default MovieTable;
