import { configureStore } from "@reduxjs/toolkit";

import vacationsReducer from "./vacationSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    vacations: vacationsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
