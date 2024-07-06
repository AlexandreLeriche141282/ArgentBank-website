import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, getUserProfile } from '../../services/callApi';

// Fonction pour charger le token et l'utilisateur du localStorage
const loadFromStorage = () => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  if (token) {
    return { token, isAuthenticated: true, user };
  }
  return { token: null, isAuthenticated: false, user: null };
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      const profile = await getUserProfile(data.token);
      localStorage.setItem('user', JSON.stringify(profile));
      return { token: data.token, profile };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred during login');
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (auth.token && !auth.user) {
      try {
        const profile = await getUserProfile(auth.token);
        localStorage.setItem('user', JSON.stringify(profile));
        return profile;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to load user profile');
      }
    }
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...loadFromStorage(),
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.profile;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
        }
      });
  }
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
