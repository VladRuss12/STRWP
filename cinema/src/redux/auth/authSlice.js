import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../api/axiosConfig';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/auth/sign-in', credentials);
      axiosConfig.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка авторизации');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    role: null,
    token: null, 
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.token = null;  
      state.error = null;
      localStorage.removeItem('jwt_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.token = action.payload.token;  
        state.loading = false;
        state.error = null;
        localStorage.setItem('jwt_token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token; 

export default authSlice.reducer;
