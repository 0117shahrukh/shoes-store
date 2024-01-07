import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../redux/productSlice'
import categoryreducer from '../redux/categorySlice'
import wishListReducer from '../redux/wishlistSlice'

const store = configureStore({
 reducer :{
   card : productReducer,
   category : categoryreducer,
   wishList : wishListReducer,
 }
})

export default store