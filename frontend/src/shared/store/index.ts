import { configureStore } from '@reduxjs/toolkit';

import helloReducer, { helloSlice } from './HelloSlice';

import postReducer, { postSlice } from './PostSlice';

import threadReducer, { threadSlice } from './ThreadSlice';

import loginReducer, { loginSlice } from './LoginSlice';

import modalReducer, { modalSlice } from './ModalSlice';

import stampReducer, { stampSlice } from './StampSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    posts: postReducer,
    thread: threadReducer,
    login: loginReducer,
    modal: modalReducer,
    stamp: stampReducer,
  },
});

export const actions = {
  ...helloSlice.actions,
  ...postSlice.actions,
  ...threadSlice.actions,
  ...loginSlice.actions,
  ...modalSlice.actions,
  ...stampSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
