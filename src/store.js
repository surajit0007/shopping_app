import { configureStore } from "@reduxjs/toolkit";
import ecommerceRecuder from './Reducers'


const store=configureStore({
    reducer:ecommerceRecuder
})


export default store