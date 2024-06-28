import { createSlice } from '@reduxjs/toolkit';

export const threadSlice = createSlice({
    name: 'thread',
    initialState: {SelectedThreadId: null},
    reducers: {
        SelectThread: (state, action) => {
            state.SelectedThreadId = action.payload;
        }

    },
});

export default threadSlice.reducer;