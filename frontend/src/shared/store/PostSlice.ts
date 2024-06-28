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
    reducers: {
        AddStamp: (state, action) => {
            let boardElements: BoardElement[]; //postかreplyの配列
            if(action.payload.type === "post") boardElements = state.posts;
            else if(action.payload.type === "reply") boardElements = state.replies;
            else boardElements = [];
            if(boardElements.length === 0) return;

            boardElements = boardElements.map(boardElement => {
                if(boardElement.id === action.payload.postId) {
                    const stamps = boardElement.stamps;
                    let stampIncluded = false;
                    const nextStamps = stamps.map(stamp => {
                        if(stamp.name === action.payload.stamp.name) {
                            stampIncluded = true;
                            const resStamp: {name: string; users: number[]; count: number} = {
                                name: action.payload.stamp.name,
                                users: [
                                    ...stamp.users,
                                    action.payload.userId
                                ],
                                count: stamp.count + 1,
                            }
                            return resStamp;
                        }
                        return stamp;
                    });
                    if(!stampIncluded) { //スタンプが1つもついていない場合
                        nextStamps.push({
                            name: action.payload.stamp.name,
                            users: [action.payload.userId],
                            count: 1,
                        });
                    }
                    return {
                        ...boardElement,
                        stamps: nextStamps,
                    }
                }
                return boardElement;
            });
            if(action.payload.type === "post") state.posts = boardElements;
            else if(action.payload.type === "reply") state.replies = boardElements;
        },
        RemoveStamp: (state, action) => {
            console.log("remove stamp reducer");
            let boardElements: BoardElement[];
            if(action.payload.type === "post") boardElements = state.posts;
            else if(action.payload.type === "reply") boardElements = state.replies;
            else boardElements = [];
            if(boardElements.length === 0) return;

            boardElements = boardElements.map(boardElement => {
                if(boardElement.id === action.payload.postId) {
                    const stamps = boardElement.stamps;
                    let nextStamps = stamps.map(stamp => {
                        if(stamp.name === action.payload.stamp.name) {
                            const removedUsers = stamp.users.filter(user => user != action.payload.userId);
                            return {
                                name: action.payload.stamp.name,
                                users: removedUsers,
                                count: stamp.count - 1,
                            }
                        }
                        return stamp;
                    });
                    nextStamps = nextStamps.filter(stamp => stamp.count > 0);
                    return {
                        ...boardElement,
                        stamps: nextStamps,
                    }
                }
                return boardElement;
            });
            if(action.payload.type === "post") state.posts = boardElements;
            else if(action.payload.type === "reply") state.replies = boardElements;
        }
    },
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

