import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserProfile } from '../../services/callApi';

export const updateProfile = createAsyncThunk(
  'updateProfile/update',
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      return await updateUserProfile(token, userData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState: {
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default updateProfileSlice.reducer;