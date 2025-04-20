import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    publicCount: 0,
    publicPosts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        createPublic: (state, action) => {
        state.publicCount = state.publicCount + 1;
        state.publicPosts.push(action.payload)
        },
        updatePublic: (state, action) => {
        
        state.publicPosts = state.publicPosts.map((publicPost) => {
          if(publicPost.$id === action.payload.$id){
             return action.payload
          }

          return publicPost;
        }
        )
        
        },
        deletePublic: (state, action) => {
        state.publicCount = state.publicCount - 1;

        const pubPosts = [];

        state.publicPosts.forEach((publicPost, index) => {
            if(publicPost.$id === action.payload.$id){
               return null;
            }
  
            pubPosts.push(publicPost)
          }
          )

        state.publicPosts = pubPosts;

        }

        

    },
}) 

export default postSlice.reducer;

export const {createPublic, updatePublic, deletePublic} = postSlice.actions;