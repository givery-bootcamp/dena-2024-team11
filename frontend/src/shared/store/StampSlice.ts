import { createSlice } from '@reduxjs/toolkit';
import { Stamp } from '../models';

export type StampState = {
    postStamps: {postId: number, stamps: Stamp[]}[];
    replyStamps: {postId: number, stamps: Stamp[]}[];
};

export const initialState: StampState = {
    postStamps: [],
    replyStamps: [],
};

export const stampSlice = createSlice({
    name: 'stamp',
    initialState: initialState,
    reducers: {
        // AddStamp: (state, action) => {
        //     let isIncluded = false;
        //     let postStamps = state.postStamps;
        //     if(action.payload.type === "post") postStamps = state.postStamps;
        //     else if(action.payload.type === "reply") postStamps = state.replyStamps;
        //     postStamps = postStamps.map(postStamp => {
        //         if(postStamp.postId === action.payload.postId) {
        //             isIncluded = true;
        //             const stamps = postStamp.stamps;
        //             let stampIncluded = false;
        //             const nextStamps = stamps.map(stamp => {
        //                 if(stamp.name === action.payload.stamp.name) {
        //                     stampIncluded = true;
        //                     return {
        //                         name: action.payload.stamp.name,
        //                         isIncluded: true,
        //                         count: stamp.count + 1,
        //                     }
        //                 }
        //                 return stamp;
        //             });
        //             if(!stampIncluded) {
        //                 nextStamps.push({
        //                     name: action.payload.stamp.name,
        //                     isIncluded: true,
        //                     count: action.payload.stamp.count,
        //                 });
        //             }
        //             return {
        //                 postId: action.payload.postId,
        //                 stamps: nextStamps,
        //             }
        //         }
        //         return postStamp;
        //     });
        //     if(!isIncluded) {
        //         postStamps = [
        //             ...postStamps,
        //             {
        //                 postId: action.payload.postId,
        //                 stamps: [action.payload.stamp],
        //             }
        //         ];
        //     }
        //     if(action.payload.type === "post") state.postStamps = postStamps;
        //     else if(action.payload.type === "reply") state.replyStamps = postStamps;
        // },
        // RemoveStamp: (state, action) => {
        //     let postStamps = state.postStamps;
        //     if(action.payload.type === "post") postStamps = state.postStamps;
        //     else if(action.payload.type === "reply") postStamps = state.replyStamps;
        //     postStamps = postStamps.map(postStamp => {
        //         if(postStamp.postId === action.payload.postId) {
        //             const stamps = postStamp.stamps;
        //             let nextStamps = stamps.map(stamp => {
        //                 if(stamp.name === action.payload.stamp.name) {
        //                     return {
        //                         name: action.payload.stamp.name,
        //                         isIncluded: false,
        //                         count: stamp.count - 1,
        //                     }
        //                 }
        //                 return stamp;
        //             });
        //             nextStamps = nextStamps.filter(stamp => stamp.count > 0);
        //             return {
        //                 postId: action.payload.postId,
        //                 stamps: nextStamps,
        //             }
        //         }
        //         return postStamp;
        //     });
        //     if(action.payload.type === "post") state.postStamps = postStamps;
        //     else if(action.payload.type === "reply") state.replyStamps = postStamps;
        // }
    },
});

export default stampSlice.reducer;