import { createSlice } from '@reduxjs/toolkit';

import { BoardElement } from '../models';
import { APIService } from '../services';

export type BoardState = {
    posts: BoardElement[];
};



export const initialState: BoardState = {
    posts: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(APIService.postBoard.fulfilled, (state, action) => {
            state.posts = [...action.payload];
        });
    },
});

export default postSlice.reducer;

