"use client"

import {createSlice,current} from '@reduxjs/toolkit'


const initialState ={
    card  : JSON.parse(localStorage.getItem('card'))  ?? []
}


const ProductSlice = createSlice({
    name : 'product',
    initialState,
   
    reducers:{
       
        addToCard : (state,action)=>{
          
         const item = state.card.find((p)=>p.id === action.payload.id);
         if (item) {
          item.quantity++;
          item.price = item.oneQuantityPrice * item.quantity;
      } else {
          state.card.push({...action.payload});
      }
      let userCard = JSON.stringify(current(state.card));
      localStorage.setItem('card',userCard)
  
        },

        updateCart: (state, action) => {
          state.card = state.card.map((p) => {
              if (p.id === action.payload.id) {
                  if (action.payload.key === "quantity") {
                      p.price =
                          p.oneQuantityPrice * action.payload.val;
                  }
                  return { ...p, [action.payload.key]: action.payload.val };
              }
              return p;
          });
      },

      deleteItems : (state,action)=>{
       state.card = state.card.filter((item)=>item.id !== action.payload.id)
       let userCard = JSON.stringify((state.card));
      localStorage.setItem('card',userCard)
   
      }
    }
})

export const {addToCard,updateCart,deleteItems} = ProductSlice.actions;

export default ProductSlice.reducer