import { createSlice } from '@reduxjs/toolkit';

// Check for existing data in localStorage
const storedUser = localStorage.getItem('user');
const storedRole = localStorage.getItem('role');
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  role: storedRole || null,
  token: storedToken || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;