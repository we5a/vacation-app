import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  availabilityOfTimeOff: {
    vacation: number;
    dayOff: number;
  };
}

const initialState: UserState | null = {
  id: "vbn",
  firstName: "",
  lastName: "",
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
      state = action.payload;
    },
    deleteUser: (state) => {
      (state as unknown as null) = null;
    },
  },
});

export const { deleteUser, setUser } = userSlice.actions;

export default userSlice.reducer;
