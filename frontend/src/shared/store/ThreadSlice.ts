import { createSlice } from '@reduxjs/toolkit';

import { BoardElement } from '../models';

export type BoardState = {
    posts: BoardElement[];
};



export const initialState: BoardState = {
    posts: [],
};

export const SelectThread = (state: BoardState) => state.posts;

export const threadSlice = createSlice({
    name: 'thread',
    initialState: {SelectedThreadId: null},
    reducers: {
        SelectThread: (state, action) => {
            state.SelectedThreadId = action.payload;
        }

    },

    // extraReducers: (builder) => {"SelectThread", (state, action) => {
    //         state.posts = [...action.payload];
    //     }   
    // }
    // extraReducers: (builder) => {
    //     builder.addCase("SelectThread", (state, action) => {
    //         state.posts = [...action.payload];
    //     });
    //     // builder.addCase(APIService.postReply.fulfilled, (state, action) => {
    //     //     state.posts = [...action.payload];
    //     // });
    // },
});

export default threadSlice.reducer;