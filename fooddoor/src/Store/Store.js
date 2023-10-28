import {configureStore} from "@reduxjs/toolkit";
import CardSlice from "./CardSlice";
const Store= configureStore({
    reducer:{
            Card:CardSlice
    }
})
export default Store;