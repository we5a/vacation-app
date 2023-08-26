export type VacationStatus = "DECLINED" | "PENDING" | "APPROVED";
export type VacationType = "vacation" | "day-off";

export interface Vacation {
  id: string;
  startDate: string;
  endDate: string;
  status: VacationStatus;
  type: VacationType;
  _links?: {
    self: {
      href: string;
    };
    user: {
      href: string;
    };
  };
}
