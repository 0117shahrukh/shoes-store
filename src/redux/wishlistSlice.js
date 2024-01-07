import {createSlice,current} from '@reduxjs/toolkit'


const initialState ={
    wishList  : JSON.parse(localStorage.getItem('wishList'))  ?? []
}


const ProductSlice = createSlice({
    name : 'product',
    initialState,
   
    reducers:{
       
        addToWishList : (state,action)=>{
            state.wishList.push({...action.payload});
      
            let userCard = JSON.stringify(current(state.wishList));
            localStorage.setItem('wishList',userCard)
        },

       

      remove : (state,action)=>{
       state.wishList = state.wishList.filter((item)=>item.id !== action.payload.id)
       let userCard = JSON.stringify((state.wishList));
      localStorage.setItem('wishList',userCard)
   
      }
    }
})

export const {addToWishList,remove} = ProductSlice.actions;

export default ProductSlice.reducer