// store.js
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./Slices/Counter/";
import comonSlice from "./Slices/Comon";
const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        comon: comonSlice.reducer
        // Add other reducers if needed
    }
});

export default store;
