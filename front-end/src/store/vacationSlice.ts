import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Vacation, VacationStatus } from "./types/vacation";

interface VacationState {
  organizationId: string;
  vacations: Vacation[];
}

const initialState: VacationState = {
  organizationId: "aaa111",
  vacations: [],
};

export const vacationSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    addVacation: (state, action: PayloadAction<Vacation>) => {
      state.vacations.push(action.payload);
    },
    changeVacationStatus: (
      state,
      action: PayloadAction<{ vacationId: string; status: VacationStatus }>,
    ) => {
      state.vacations.forEach((v) => {
        const { vacationId, status } = action.payload;
        if (v.id === vacationId) {
          v.status = status;
        }
      });
    },
    removeVacation: (state, action: PayloadAction<string>) => {
      const index = state.vacations.findIndex((v) => v.id === action.payload);
      state.vacations.splice(index, 1);
    },
  },
});

export const { addVacation, changeVacationStatus, removeVacation } =
  vacationSlice.actions;
//
export default vacationSlice.reducer;
