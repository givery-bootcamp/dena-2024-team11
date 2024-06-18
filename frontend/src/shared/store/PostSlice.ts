import { createSlice } from '@reduxjs/toolkit';

import { BoardElement } from '../models';
import { APIService } from '../services';

export type BoardState = {
    posts: BoardElement[];
    replies: BoardElement[];
};

export const initialState: BoardState = {
    posts: [],
    replies: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(APIService.postBoard.fulfilled, (state, action) => {
            state.posts = [...action.payload];
        });
        builder.addCase(APIService.postReply.fulfilled, (state, action) => {
            state.replies = [...action.payload];
        });
        builder.addCase(APIService.getBoard.fulfilled, (state, action) => {
            state.posts = [...action.payload];
        });
        builder.addCase(APIService.getReplies.fulfilled, (state, action) => {
            state.replies = [...action.payload];
        });
    },
    
});

export default postSlice.reducer;

