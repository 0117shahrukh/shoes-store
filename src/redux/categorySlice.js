import {createSlice} from '@reduxjs/toolkit'

const categorySlice = createSlice({
    name : 'category',
    initialState : {
        category : ''
    },
   reducers : {
    filterCategory : (state, action)=>{
       state.category = action.payload
    }
   }
})

export const {filterCategory} = categorySlice.actions;
export default categorySlice.reducer