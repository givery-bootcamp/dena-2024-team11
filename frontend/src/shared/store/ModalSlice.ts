import { createSlice } from '@reduxjs/toolkit';
import type { ModalInfo } from '../models';

export type ModalState = {
    showModal: boolean;
    modalInfo: ModalInfo
};

export const initialState: ModalState = {
    showModal: false,
    modalInfo: {post: null, position: {top: 100, left: 200}}
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        ShowModal: (state, action) => {
            state.showModal = action.payload.showModal;
            if(!action.payload.modalInfo.post) return;
            state.modalInfo = action.payload.modalInfo;
        }
    },
});

export default modalSlice.reducer;