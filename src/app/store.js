import { configureStore } from "@reduxjs/toolkit";
import textReducer from "../features/text";
const store = configureStore({
  reducer: {
    newText: textReducer,
  },
});

export default store;
