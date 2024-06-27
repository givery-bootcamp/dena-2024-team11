import { createSlice } from '@reduxjs/toolkit';
import { Stamp } from '../models';

export type StampState = {
    postStamps: {postId: number, stamps: Stamp[]}[];
};

export const initialState: StampState = {
    postStamps: [],
};

export const stampSlice = createSlice({
    name: 'stamp',
    initialState: initialState,
    reducers: {
        AddStamp: (state, action) => {
            let isIncluded = false;
            state.postStamps = state.postStamps.map(postStamp => {
                if(postStamp.postId === action.payload.postId) {
                    isIncluded = true;
                    const stamps = postStamp.stamps;
                    let stampIncluded = false;
                    const nextStamps = stamps.map(stamp => {
                        if(stamp.name === action.payload.stamp.name) {
                            stampIncluded = true;
                            return {
                                name: action.payload.stamp.name,
                                isIncluded: true,
                                count: stamp.count + 1,
                            }
                        }
                        return stamp;
                    });
                    if(!stampIncluded) {
                        nextStamps.push({
                            name: action.payload.stamp.name,
                            isIncluded: true,
                            count: action.payload.stamp.count,
                        });
                    }
                    return {
                        postId: action.payload.postId,
                        stamps: nextStamps,
                    }
                }
                return postStamp;
            });
            if(!isIncluded) {
                state.postStamps.push({
                    postId: action.payload.postId,
                    stamps: [action.payload.stamp],
                });
            }
        }
        // RemoveStamp: (state, action) => {
            
        // }
    },
});

export default stampSlice.reducer;