import { createSlice } from '@reduxjs/toolkit';

import { BoardElement } from '../models';

export type BoardState = {
    posts: BoardElement[];
};



export const initialState: BoardState = {
    posts: [],
};

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