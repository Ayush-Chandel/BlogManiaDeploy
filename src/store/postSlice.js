import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    publicCount: 0,
    publicPosts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        updatePublic: (state, action) => {
        state.publicCount = action.payload[0];
        state.publicPosts= action.payload[1] 
        },
        increPublic: (state, action) => {
        state.publicCount = action.payload[0];
        state.publicPosts.push(action.payload[1] );
        }
    },
}) 

export default postSlice.reducer;

export const {updatePublic,increPublic} = postSlice.actions;