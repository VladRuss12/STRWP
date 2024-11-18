import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.error = null;
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
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
