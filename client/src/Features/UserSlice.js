import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    details: {},
    loading: false,
    error: null,
  },
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.details = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserError } = userSlice.actions;

export const fetchUserDetails = (token) => async (dispatch) => {
  try {
    dispatch(fetchUserStart());
    const headers = {
        'Authorization': token
    }
    const response = await axios.get('http://localhost:5000/user', {headers});
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserError(error.message));
  }
};

export default userSlice.reducer;
