import { createSlice } from '@reduxjs/toolkit';

export type ModalState = {
    showModal: boolean;
    position: {top: number, left: number}
};

export const initialState: ModalState = {
    showModal: false,
    position: {top: 100, left: 200}
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showModal: false,
        position: {top: 100, left: 200}
    },
    reducers: {
        ShowModal: (state, action) => {
            state.showModal = action.payload.showModal;
            state.position = action.payload.position;
        }
    },
});

export default modalSlice.reducer;