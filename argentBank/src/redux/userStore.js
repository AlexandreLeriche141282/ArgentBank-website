// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import userProfileReducer from './slice/userSlice';
import updateProfileReducer from './slice/editProfileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    updateProfile: updateProfileReducer
  }
});