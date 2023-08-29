import { createSlice } from '@reduxjs/toolkit';
import { createBill, updateAmountPayment } from './paymentThunk';


const initialState = {
  // Trạng thái ban đầu của slice
  data: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment', // Tên của slice
  initialState,   // Trạng thái ban đầu
  reducers: {
  },
  extraReducers: builder =>{
    builder.addCase(createBill.pending, (state, action) => {
        state.loading = false
    });
    builder.addCase(createBill.fulfilled, (state, action) => {
        state.loading = true
        state.data = action.payload
        state.error = ""
    });
    builder.addCase(createBill.rejected, (state, action) => {
        state.loading = true
        state.error = action.payload
    })

    builder.addCase(updateAmountPayment.pending, (state, action) => {
      state.loading = false
    });
    builder.addCase(updateAmountPayment.fulfilled, (state, action) => {
        state.loading = true
        state.data = action.payload
        state.error = ""
    });
    builder.addCase(updateAmountPayment.rejected, (state, action) => {
        state.loading = true
        state.error = action.payload
    })
  }
});

// Export actions và reducer từ slice

export default paymentSlice.reducer;
