import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  role: string;
  organization: string;
  availabilityOfTimeOff?: {
    vacation: number;
    dayOff: number;
  };
  _links?: {
    self: {
      href: string;
    };
    organization: {
      href: string;
    };
  };
}

export const initialState: UserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
  phoneNumber: "",
  role: "worker",
  organization: "",
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
