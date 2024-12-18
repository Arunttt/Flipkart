import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/ProductSlice';

const store = configureStore({
    reducer: {
        product: productReducer,
        
    },
});

export default store;
