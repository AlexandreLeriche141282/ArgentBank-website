import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserProfile } from '../../services/callApi';
import { updateUser } from './authSlice'; // Ajoutez cette ligne


export const updateProfile = createAsyncThunk(
  'updateProfile/update',
  async ({ token, userData }, { dispatch, rejectWithValue }) => {
    try {
      const updatedProfile = await updateUserProfile(token, userData);
      dispatch(updateUser(updatedProfile)); // Ajoutez cette ligne
      return updatedProfile;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);


const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState: {
    loading: false,
    error: null,
    success: false,
    updatedData: null
  },
  reducers: {
    clearProfileData: (state) => {
      state.updatedData = null;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedData = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { clearProfileData } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;