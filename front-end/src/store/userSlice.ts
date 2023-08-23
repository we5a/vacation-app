import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type Nullable<T> = T | undefined | null;
interface UserInfo {
  id: string;
  name: string,
  given_name: string;
  family_name: string;
  email: string;
  role?: string;
  availabilityOfTimeOff?: {
    vacation: number;
    dayOff: number;
  };
}

export const initialState: UserInfo = {
  id: "",
  name: "",
  given_name: "",
  family_name: "",
  email: "",
  role: "worker",
  availabilityOfTimeOff: {
    vacation: 25,
    dayOff: 15,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state = action.payload;
    },
    deleteUser: (state: Nullable<UserInfo>) => {
      state = null;
    },
  },
});

export const { deleteUser, setUser } = userSlice.actions;

export default userSlice.reducer;
