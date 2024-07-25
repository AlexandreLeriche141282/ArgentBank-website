import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserProfile } from '../../services/callApi';
import { updateUser } from './authSlice'; 

// Création d'un thunk asynchrone pour mettre à jour le profil utilisateur
export const updateProfile = createAsyncThunk(
  'updateProfile/update', // Nom de l'action
  async ({ token, userData }, { dispatch, rejectWithValue }) => {
    try {
      // Appel API pour mettre à jour le profil utilisateur
      const updatedProfile = await updateUserProfile(token, userData);
      // Mise à jour de l'état utilisateur après la mise à jour du profil
      dispatch(updateUser(updatedProfile));
      return updatedProfile; // Retourne les données mises à jour du profil
    } catch (error) {
      // En cas d'erreur, renvoie un message d'erreur avec rejectWithValue
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Création d'un slice Redux pour gérer l'état de la mise à jour du profil utilisateur
const updateProfileSlice = createSlice({
  name: 'updateProfile', // Nom du slice
  initialState: { // État initial du slice
    loading: false, // Indique si une mise à jour est en cours
    error: null, // Contient le message d'erreur en cas d'échec de mise à jour
    success: false, // Indique si la mise à jour a réussi
    updatedData: null // Contient les données mises à jour du profil utilisateur
  },
  reducers: { // Actions synchrones pour ce slice
    clearProfileData: (state) => { // Action pour réinitialiser les données de profil
      state.updatedData = null;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => { // Gérer les actions asynchrones créées par createAsyncThunk
    builder
      .addCase(updateProfile.pending, (state) => { // Action déclenchée au début de la mise à jour
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => { // Action déclenchée après une mise à jour réussie
        state.loading = false;
        state.success = true;
        state.updatedData = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => { // Action déclenchée après un échec de mise à jour
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

// Exportation de l'action pour réinitialiser les données de profil
export const { clearProfileData } = updateProfileSlice.actions;

// Exportation du reducer pour ce slice afin de l'inclure dans le store Redux
export default updateProfileSlice.reducer;
