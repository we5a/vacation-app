import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
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
      return { ...state, ...action.payload };
    },
    deleteUser: () => {
      return initialState;
    },
  },
});

export const { deleteUser, setUser } = userSlice.actions;

export default userSlice.reducer;
