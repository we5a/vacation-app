import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
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

export const initialState: UserState | null = {
  id: "vbn",
  name: "",
  given_name: "",
  family_name: "",
  email: "user@mail.com",
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
    setUser: (state, action: PayloadAction<UserState>) => {
      return {...state, ...action.payload};
    },
    deleteUser: (state) => {
      (state as unknown as null) = null;
    },
  },
});

export const { deleteUser, setUser } = userSlice.actions;

export default userSlice.reducer;
