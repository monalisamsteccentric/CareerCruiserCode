import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetch', async () => {
  const response = await axios.get('http://localhost:5000/jobposting');
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    isloading: false,
    jobs: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isloading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        
        state.jobs = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isloading = false
        console.log(action.error);
      });
  }
});


export default dataSlice.reducer;
