import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    sendMessage: (state, action) => {
      axios.post('http://localhost:5000/messages', action.payload)
        .then(res => {
          console.log(res.data.message);
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
});

export const { sendMessage } = messageSlice.actions;

export default messageSlice.reducer;
