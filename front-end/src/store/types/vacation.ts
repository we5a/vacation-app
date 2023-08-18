export type VacationStatus = "pending" | "approved" | "declined";
export type VacationType = "vacation" | "day-off";

export interface Vacation {
  id: string;
  startDate: string;
  endDate: string;
  status: VacationStatus;
  type: VacationType;
}
