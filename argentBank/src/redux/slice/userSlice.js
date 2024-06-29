import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../services/callApi';

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetch',
  async (token, { rejectWithValue }) => {
    try {
      return await getUserProfile(token);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default userProfileSlice.reducer;