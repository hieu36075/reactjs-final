import { createSlice } from '@reduxjs/toolkit';
import { getNoticationById } from './notificationThunks';

const initialState = {
  // Trạng thái ban đầu của slice
  data: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification', // Tên của slice
  initialState,   // Trạng thái ban đầu
  reducers: {
  },
  extraReducers: builder =>{
    builder.addCase(getNoticationById.pending, (state, action) => {
        state.loading = true
    });
    builder.addCase(getNoticationById.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = ""
    });
    builder.addCase(getNoticationById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
  }
});

// Export actions và reducer từ slice

export default notificationSlice.reducer;
