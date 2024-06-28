import { createSlice } from '@reduxjs/toolkit';
import { APIService } from '../services';
import { LoginState } from '../models';

// import { BoardElement } from '../models';

// export type BoardState = {
//     posts: BoardElement[];
// };

export const initialState: LoginState = {
    isLogin: false,
    user: {
        id: -1,
        name: "",
        icon: "",
    }
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(APIService.loginBoard.fulfilled, (state, action) => {
            state.isLogin = action.payload.isLogin;
            state.user = action.payload.user;
        });
        // builder.addCase(APIService.logoutBoard.fulfilled, (state, action) => {
        //     state.isLogin = action.payload;
        // });
    },

});

export default loginSlice.reducer;
// export const initialState: BoardState = {
//     posts: [],
// };

// export const SelectThread = (state: BoardState) => state.posts;

// export const threadSlice = createSlice({
//     name: 'thread',
//     initialState: {SelectedThreadId: null},
//     reducers: {
//         SelectThread: (state, action) => {
//             state.SelectedThreadId = action.payload;
//         }

//     },

// });

// export default threadSlice.reducer;