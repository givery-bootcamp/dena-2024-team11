import { configureStore } from '@reduxjs/toolkit';

import helloReducer, { helloSlice } from './HelloSlice';

import postReducer, { postSlice } from './PostSlice';

import threadReducer, { threadSlice } from './ThreadSlice';

import loginReducer, { loginSlice } from './LoginSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    posts: postReducer,
    thread: threadReducer,
    login: loginReducer,
  },
});

export const actions = {
  ...helloSlice.actions,
  ...postSlice.actions,
  ...threadSlice.actions,
  ...loginSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
